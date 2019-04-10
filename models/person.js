const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const uniqueValidator = require('mongoose-unique-validator');
const url = process.env.MONGODB_URI

// eslint-disable-next-line no-console
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    //console.log('connected to MongoDB')
  })
  .catch(() => {
  // console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String,minlength:3, required: true, unique: true },
  number:{ type: String, required: true , minlength:8}
})
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema);