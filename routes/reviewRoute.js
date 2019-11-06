const express = require("express");
const Router = express.Router();
const reviewModel = require("../models/Review");

Router.get('/', async function (req, res) {
  try {
    review = await reviewModel.find({}).populate('reviewOnID').exec();
    return res.json(review);
  } catch (err) {
    return res.status(500).json(err);

  }
})

Router.get('/:id', async function (req, res) {
  try {
    var ID = req.params.id;
    const review = await reviewModel.find({
      _id: ID
    }).populate('reviewOnID').exec();
    return res.json(review);
  } catch (err) {
    return res.status(500).json(err);
  }
})

Router.post('/', async function (req, res) {

  try {
    const reviewData = new reviewModel({
      body: req.body.body,
      reviewOnID: req.body.reviewOnID,
      onReview: req.body.onReview
    });
    const review = await reviewData.save();
    return res.json(review);
  } catch (err) {
    return res.status(500).json(err);
  }
});


Router.patch('/:id', async function (req, res) {
  try {
    var ID = req.params.id;
    review = await reviewModel.updateOne({
      _id: ID
    }, {
      $set: {
        body: req.body.body
      }
    })
    return res.json(review);
  } catch (err) {
    return res.status(500).json(err);

  }
})

Router.delete('/:id', async function (req, res) {
  try {
    var ID = req.params.id;
    review = await reviewModel.deleteOne({
      _id: ID
    }).exec();
    return res.json(review);
  } catch (err) {
    return res.status(500).json(err);
  }
})




module.exports = Router;