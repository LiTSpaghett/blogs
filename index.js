import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

function POST(title, content, category, summary) {
    this.title = title;
    this.content = content;
    this.category = category;
    this.summary = summary 
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleDateString();
}

function addPost(title, content, category,summary) {
    let post = new POST(title, content, category,summary);
    posts.push(post);
}

function deletePost(index) {
    posts.splice(index, 1);
}

function editPost(index, title, content, category,summary) {
    posts[index] = new POST(title, content, category,summary);
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    console.log(posts);
    res.render("index.ejs",
        { posts: posts }
    );
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/detail/:id", (req, res) => {
    let id = req.params.id;
    let post = posts[id];
    res.render("detail.ejs",{post: post,postId: id});
});

app.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    let post = posts[id];
    
    res.render("create.ejs",{post: post,postId: id});
});

app.post("/delete/:id", (req, res) => {
    let index = req.params.id;
    deletePost(posts[index]);
    res.redirect("/");
});

app.post("/save", (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let category = req.body.category;
    let summary = req.body.summary;
    addPost(title, content, category,summary);
    console.log(posts);
    res.redirect("/");
});

app.post("/update/:id", (req, res) => {
    let index = req.params.id;
    editPost(index, req.body.title, req.body.content, req.body.category,req.body.summary);
    res.redirect("/");
});

app.listen(port, () => {
    addPost("Chào mừng đến với blog của tôi", "Đây là bài viết đầu tiên trên blog của tôi. Tôi rất vui khi bạn ghé thăm!", "tech","Bài viết giới thiệu về blog.");
    addPost("Chào mừng đến với blog của tôi", "Đádsdsdsd. Tôi rất vui khi bạn ghé thăm!", "design","Bài viết giới thiệu về blog.");
  console.log(`Server is running on port ${port}`);
});