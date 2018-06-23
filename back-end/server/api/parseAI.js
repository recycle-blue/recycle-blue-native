const fs = require('fs')

const parseImgTags = (imgTagResults) => {
  console.log('google_tagging', imgTagResults.google_tagging)
  console.log('imagga_tagging', imgTagResults.imagga_tagging)
  console.log('aws_rek_tagging', imgTagResults.aws_rek_tagging)
  fs.writeFile(`./parsingData/tagResults_${new Date()}`, imgTagResults,
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  )
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
      auto_tagging: 0.6
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
