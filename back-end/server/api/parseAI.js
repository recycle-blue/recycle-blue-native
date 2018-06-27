const fs = require('fs')
const { Tag, Product, Category } = require('../db/models')

const parseImgTags = async (imgTagResults) => {
  const confidenceLimit = 0.5
  const googleTags = imgTagResults.google_tagging.data
  const imaggaTags = imgTagResults.imagga_tagging.data
  const awsRekTags = imgTagResults.aws_rek_tagging.data
  const allTags = [...googleTags, ...imaggaTags, ...awsRekTags]
  const trimmedTags = {}
  allTags.forEach(tag => {
    if (tag.confidence > confidenceLimit) {
      trimmedTags[tag.tag.toLowerCase()] ?
        trimmedTags[tag.tag.toLowerCase()] += tag.confidence
        : trimmedTags[tag.tag.toLowerCase()] = tag.confidence
    }
  })
  const sortedTags = []
  for (let tag in trimmedTags) {
    sortedTags.push([tag, trimmedTags[tag]])
  }
  sortedTags.sort((a, b) => b[1] - a[1])

  const matchCategory = []
  let matchProduct = {}
  const tagsList = await Promise.all(
    sortedTags.map(async tag => {
      const matchedTagData = await Tag.find({ where: { name: tag[0] } })
      const matchedTag = !!matchedTagData && matchedTagData.dataValues
      if (matchedTag.categoryId) {
        const category = await Category.findById(matchedTag.categoryId)
        matchCategory.push(category.dataValues)
      }
      if (!matchProduct.id && matchedTag.productId) {
        const product = await Product.findById(matchedTag.productId)
        matchProduct = product.dataValues
      }
      return matchedTag
    })
  )
  if (!matchCategory.length) {
    const defaultCategory = await Category.findById(1)
    matchCategory.push(defaultCategory.dataValues)
  }
  if (!matchProduct.id) {
    const defaultProduct = await Product.findById(1)
    matchProduct.push(defaultProduct.dataValues)
  }
  return {
    tags: tagsList,
    categories: matchCategory,
    product: matchProduct
  }
}

module.exports = { parseImgTags }
