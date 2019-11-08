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


userSchema.pre('save', function(next){
  this.Password = md5(this.Password);
  next();
})


// userSchema.pre('save', (next) => {
//   console.log("111111");
  
//   console.log(this.Password);
//   this.Password = md5(this.Password);
//   console.log(this.Password);
//   next();
// });


const user = mongoose.model("user", userSchema);

module.exports = user;