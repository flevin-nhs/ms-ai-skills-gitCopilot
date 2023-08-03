//Create web server 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const Comment = require('./models/comment');
const PORT = 4001;

app.use(cors());
app.use(bodyParser.json());

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//Create routes
const commentsRoutes = express.Router();

//Get all comments
commentsRoutes.route('/').get(function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            console.log(err);
        } else {
            res.json(comments);
        }
    });