const mongoose = require("mongoose");
mongoose.connect('mongodb://test:test@ds131890.mlab.com:31890/my_cool_db');

module.exports = mongoose.model('Post', { title: String, date:Date,  author:String, text:String });