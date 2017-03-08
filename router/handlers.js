module.exports = {
  indexPage: indexPage,
  folderAction: folderAction,
  sendLetter:sendLetter,
  sendLetterPost:sendLetterPost
};


const fs = require("fs");
const helpers = require("../helpers/helpres")

const pug = require("pug");
const mjml = require("mjml");
const _ =require("lodash")


const SparkPost = require('sparkpost');
const sparky = new SparkPost('');

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

function sendLetter(req, res) {
  res.send(pug.renderFile(__dirname+"/../views/pug/sendLetter/index.pug", {
    title: 'test title'
  }));
}

function sendLetterPost(req, res) {
  let email = req.body.email;
  let text = req.body.text;
  console.log(req.body)

  let arrEmails = email.split(",");
  let newArrEmails = _.map(arrEmails, function (el) {
    return {address:_.trim(el)}
  });

  console.log(newArrEmails);

  let emailText = `
<mjml>
  <mj-body>
    <mj-container>
      <mj-section>
        <mj-column>
          <mj-divider border-color="#F45E43"></mj-divider>
          <mj-text font-size="20px" color="#F45E43" font-family="helvetica">
           ${text} 
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-container>
  </mj-body>
</mjml>`;

  let emailHtml = mjml.mjml2html(emailText)

  sparky.transmissions.send({
    content: {
      from: 'testing@sparkpostbox.com',
      subject: 'Oh hey! Test Task',
      html:emailHtml.html
    },
    recipients: newArrEmails
  })
    .then(data => {
      console.log('Woohoo! You just sent your first mailing!');
      console.log(data);
    })
    .catch(err => {
      console.log('Whoops! Something went wrong');
      console.log(err);
    });


  res.send(emailHtml.html)
}