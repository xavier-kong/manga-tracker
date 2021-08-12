const mongoose = require('mongoose')

const mangaSchema = new mongoose.Schema({
    title: String,
    mainUrl: String,
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      chapter: Number,
      status: String, 
      lastRead: String,
    }] 
})

mangaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Manga', mangaSchema)