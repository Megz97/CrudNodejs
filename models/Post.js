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


postSchema.pre('deleteMany', async function(next){
  let ID = this.getQuery()["_id"];
    const review = await reviewModel.deleteMany({
      reviewOnID: ID
    }).exec();
  next();
})

// postSchema.pre('deleteOne', function (next) {
//   try {
//     console.log("1111111111111111111111");
//     console.log(this.title);
//     // const review = reviewModel.deleteOne({
//     //   reviewOnID: this._id
//     // }).exec();
//     next();
//   } catch (err) {
//     return res.status(401).json(err);
//   }
// });


const post = mongoose.model("post", postSchema);
module.exports = post;