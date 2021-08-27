const mongoose = require('mongoose')

const URI = process.env.MONGODB_URL

mongoose.connect(URI)
  .then(db=>{
    console.log(`${db.connection.name} DB connected`)
  })
  .catch(err=> console.log(err))

module.exports = mongoose