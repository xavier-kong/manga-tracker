const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const mangaSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minLength: 1
    },
    mainUrl: String,
})

mangaSchema.plugin(uniqueValidator)

mangaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Manga', mangaSchema)