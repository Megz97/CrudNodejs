let mongoose = require('mongoose')


let accessTokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  usersID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});




const accessTokenmodel = mongoose.model("accessToken", accessTokenSchema);
module.exports = accessTokenmodel;