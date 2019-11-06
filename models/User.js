let mongoose = require('mongoose')
let md5 = require('md5');

let userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: 8,
  },
  isDeleted: {
    type: String,
    required: true,
  }

})


userSchema.pre('save', (next) => {
  this.Password = md5(this.Password);
  next();
})


const user = mongoose.model("user", userSchema);

module.exports = user;