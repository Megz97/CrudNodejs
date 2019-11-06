const express = require("express");
const Router = express.Router();
const userModel = require("../models/User");
const postModel = require("../models/Post");
const reviewModel = require("../models/Review");

Router.get('/', async function (req, res) {
  try {
    const user = await userModel.find({}).populate('usersID').exec();
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
})

Router.get('/:id', async function (req, res) {
  try {
    var ID = req.params.id;
    const user = await userModel.find({
      _id: ID
    }).exec();
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
})

Router.post('/', async function (req, res) {
  const {
    Name,
    Email,
    Password
  } = req.body;

  try {
    const userData = new userModel({
      Name,
      Email,
      Password,
      isDeleted: false
    });
    const user = await userData.save();
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }

})

Router.patch('/:id', async function (req, res) {

  try {
    var ID = req.params.id;
    const user = await userModel.updateOne({
      _id: ID
    }, {
      $set: {
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password
      }
    }).exec();
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
})

Router.delete('/:id', async function (req, res) {
  var ID = req.params.id;
  // userModel.deleteOne({
  //   _id: ID
  // }, (err, data) => {
  //   if (err) return res.status(500).json(err);
  //   return res.json(data);
  // })
  try {
    const user = await userModel.updateOne({
      _id: ID
    }, {
      $set: {
        isDeleted: true,
      }
    }).exec();
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
})




Router.get('/:id/posts', async function (req, res) {
  try {
    var ID = req.params.id;
    const user = await postModel.find({
      usersID: ID
    }).populate('usersID').exec();
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
})

Router.get('/:id/review', async function (req, res) {
  try {
    var ID = req.params.id;
    const review = await reviewModel.find({
      reviewOnID: ID
    }).populate('reviewOnID').exec();
    return res.json(review);
  } catch (err) {
    return res.status(500).json(err);
  }
})

module.exports = Router;





// Router.get('/:id/posts', function (req, res) {
//   var ID = req.params.id;
//   postModel.find({
//     usersID: ID
//   }, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.json(data);
//   }).populate('usersID')
// })