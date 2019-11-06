let mongoose = require('mongoose')

let reviewSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  reviewOnID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "onReview"
  },
  onReview: {
    type: String,
    required: true,
    enum: ['user', 'post'],
  }
})





const review = mongoose.model("review", reviewSchema);
module.exports = review;