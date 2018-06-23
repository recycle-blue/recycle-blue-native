const fs = require('fs')
const { Tag } = require('../db/models')

const parseImgTags = (imgTagResults) => {
  console.log('google_tagging', imgTagResults.google_tagging)
  console.log('imagga_tagging', imgTagResults.imagga_tagging)
  console.log('aws_rek_tagging', imgTagResults.aws_rek_tagging)
  fs.writeFile(`/tmp/tagResults.txt`, imgTagResults,
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  )

  const confidenceLimit = 0.5
  const googleTags = imgTagResults.google_tagging.data
  const imaggaTags = imgTagResults.imagga_tagging.data
  const awsRekTags = imgTagResults.aws_rek_tagging.data
  const allTags = [...googleTags, ...imaggaTags, ...awsRekTags]
  const trimmedTags = {}
  allTags.forEach(tag => {
    if (tag.confidence > confidenceLimit) {
      trimmedTags[tag.tag] ?
        trimmedTags[tag.tag] += tag.confidence
        : trimmedTags[tag.tag] = tag.confidence
    }
  })
  const sortedTags = []
  for (let tag in trimmedTags) {
    sortedTags.push([tag, trimmedTags[tag]])
  }
  sortedTags.sort((a, b) => b[1] - a[1])

  const matchCategory = false
  const matchProduct = false
  let index = 0
  while (index < sortedTags.length || (matchCategory && matchProduct)) {

    index++
  }

  return {
    name: 'bottle',
    category: 'Plastic',
  }
}

const sendPhotoToCloud = async (photo) => {
  const cloudData = await cloudinary.v2.uploader.upload(
    photo,
    {
      categorization: 'google_tagging,imagga_tagging,aws_rek_tagging',
      auto_tagging: 0.5
    }
  )
  const imageUrl = cloudData.secure_url
  const imgRecognitionResults = cloudData.info.categorization
  const parsedTags = parseImgTags(imgRecognitionResults)
  return {
    name: parsedTags.name,
    category: parsedTags.category,
    imageUrl
  }
}

module.exports = { parseImgTags }
