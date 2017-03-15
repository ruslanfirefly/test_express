module.exports = {
  indexPage: indexPage,
  createAction: createAction,
  createActionPost: createActionPost,
  editPost:editPost,
  editPostPost:editPostPost
};


const fs = require("fs");
const helpers = require("../helpers/helpres")
const Post = require("../models/post");
const pug = require("pug");
const _ = require("lodash")


function indexPage(req, res, next) {
  Post.find({})
    .then(posts=>{
      "use strict";
      // res.send(pug.renderFile(__dirname + "/../views/pug/index/index.pug", {posts:posts}));
      res.json({posts:posts})
    })



}

function createAction(req, res) {
  res.send(pug.renderFile(__dirname + "/../views/pug/posts/index.pug", {}));

}
function createActionPost(req, res) {
  let post = new Post({
    title: req.body.title,
    author: req.body.author,
    text: req.body.text,
    date: new Date()
  });
  post.save((err)=>{
    "use strict";
    if (err) {
      console.log(err);
    } else {
      console.log('create post');
    }

  })

}

function editPost(req, res) {

  Post.find({_id:req.params.id})
    .then(post=>{
      "use strict";
      console.log(post)
      res.send(pug.renderFile(__dirname + "/../views/pug/posts/edit.pug", {post:post[0]}));
    })
    .catch(err=>{
      "use strict";

    })


}

function editPostPost(req, res) {
  Post.update({_id:req.params.id}, {$set:{
    title: req.body.title,
    author: req.body.author,
    text: req.body.text,
  }})
    .then(result=>{
      "use strict";
      res.redirect('/');
    })
}

// function sendLetter(req, res) {
//   res.send(pug.renderFile(__dirname+"/../views/pug/sendLetter/index.pug", {
//     title: 'test title'
//   }));
// }


// function sendLetterPost(req, res) {
//   let email = req.body.email;
//   let text = req.body.text;
//   console.log(req.body)
//
//   let arrEmails = email.split(",");
//   let newArrEmails = _.map(arrEmails, function (el) {
//     return {address:_.trim(el)}
//   });
//
//   console.log(newArrEmails);
//
//   let emailText = `
// <mjml>
//   <mj-body>
//     <mj-container>
//       <mj-section>
//         <mj-column>
//           <mj-divider border-color="#F45E43"></mj-divider>
//           <mj-text font-size="20px" color="#F45E43" font-family="helvetica">
//            ${text}
//           </mj-text>
//         </mj-column>
//       </mj-section>
//     </mj-container>
//   </mj-body>
// </mjml>`;
//
//   let emailHtml = mjml.mjml2html(emailText)
//
//   sparky.transmissions.send({
//     content: {
//       from: 'testing@sparkpostbox.com',
//       subject: 'Oh hey! Test Task',
//       html:emailHtml.html
//     },
//     recipients: newArrEmails
//   })
//     .then(data => {
//       console.log('Woohoo! You just sent your first mailing!');
//       console.log(data);
//     })
//     .catch(err => {
//       console.log('Whoops! Something went wrong');
//       console.log(err);
//     });
//
//
//   res.send(emailHtml.html)
// }