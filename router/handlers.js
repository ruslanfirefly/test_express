module.exports = {
  indexPage: indexPage,
  folderAction: folderAction,
  sendLetter:sendLetter
};


const fs = require("fs");
const helpers = require("../helpers/helpres")

function indexPage(req, res, next) {
  fs.readFile(__dirname+ "/../views/index.html", function (err,data) {
    "use strict";
    if(!err){
      res.set("Content-type", "text/html");
      res.send(data)
    }else{
      req.custom_err = "not found"
        next()
    }

  })

}


function folderAction(req, res, next) {
  let folder_path = req.query["path"];
  res.json(helpers.getFolderStructure(folder_path))

}

function test(req, res ) {
  axios.get("vk.com")
    .then(()=>{
    "use strict";
      res.send(data.data)
    })
}

function sendLetter() {

}