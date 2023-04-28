const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
const aboutContent =
  "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,";
const contactContent =
  "he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 an";

const app = express();
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public")); //used when css is sent to browser to style it

var posts = [];

//Home Page Route
app.get("/", function (req, res) {
  res.render("home", { content: homeStartingContent, posts: posts });
});

//About Page Route
app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent });
});

//Contact Us Page
app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent });
});

//Compose Page Route
app.get("/compose", function (req, res) {
  res.render("compose");
});

//called when user sends somthing from compose page
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:topic", function(req, res){
    const requestedTitle = _.lowerCase(req.params.topic);
    posts.forEach(function(post){
      const storedTitle = _.lowerCase(post.title);
      if(storedTitle === requestedTitle){
        console.log("match found!!!!!!!!!!!!");
        res.render("post", {postTitle: post.title, postBody: post.content});
      }
    });

});


app.listen("3000", function () {
  console.log("Server running on port 3000");
});
