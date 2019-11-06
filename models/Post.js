let mongoose = require('mongoose')
let reviewModel = require('./Review');


let postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  usersID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})


postSchema.pre('remove', function (doc, next) {
  try {
    console.log("1111111111111111111111");

    console.log(doc);
    const review = reviewModel.remove({
      reviewOnID: this._id
    }).exec();
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
});


const post = mongoose.model("post", postSchema);
module.exports = post;