const express = require("express");
const Router = express.Router();
const postModel = require("../models/Post");
const reviewModel = require("../models/Review");

Router.get('/', async function (req, res) {
  try {
    const posts = await postModel.find({}).populate('usersID').exec();
    return res.json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
})



Router.get('/:id', async function (req, res) {
  try {
    var ID = req.params.id;
    const post = await postModel.find({
      _id: ID
    }).populate('usersID').exec();
    return res.json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
})

Router.post('/', async function (req, res) {

  try {
    const newpost = new postModel({
      title: req.body.title,
      body: req.body.body,
      usersID: req.body.usersID,
    });
    const post = await newpost.save(); //save return promise by default
    return res.json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
})

Router.patch('/:id', async function (req, res) {

  try {
    var ID = req.params.id;
    const post = await postModel.updateOne({
      _id: ID
    }, {
      $set: {
        title: req.body.title,
        body: req.body.body,
      }
    }).exec()
    return res.json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
})



Router.delete('/:id', async function (req, res) {

  try {
    var ID = req.params.id;
    const post = await postModel.findByIdAndRemove(ID).exec();
    return res.json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
})


Router.get('/:id/review', function (req, res) {
  try {
    var ID = req.params.id;
    const review = reviewModel.find({
      reviewOnID: ID
    }).populate('reviewOnID').exec();
    return res.json(review);
  } catch (err) {
    return res.status(500).json(err);
  }
})


module.exports = Router;