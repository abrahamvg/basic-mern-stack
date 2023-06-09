const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    notes: [
        {
          title: { type: String, required: true },
          note: { type: String, required: true }
        }
      ],
    data: {type : String},
    },{collection:'user-data'}
)

const model = mongoose.model('UserData', User)

module.exports = model;