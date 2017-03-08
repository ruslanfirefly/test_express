"use strict";
const express = require("express");
const createRoutes = require("./router/index");
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require("path");


let app = express();

app.use(cors());
app.use(bodyParser());
app.use('/static', express.static(path.join(__dirname, 'public')));


app = createRoutes(app);


app.use(function (req, res) {
  let text  = req.custom_err || "html"
  res.status(404).send(text)
})

app.listen(3000, (el) => {
  console.log(" Hello i'm new server ");
  console.log(el)

});
