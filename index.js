const http = require('http');
const hostname = '127.0.0.1';
const port = process.env.port || 3000;


const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true
});

const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const reviewRouter = require('./routes/reviewRoute');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/reviews', reviewRouter);







app.listen(port, hostname, (err) => {
  console.log(`Server running at http://${hostname}:${port}/`);
});