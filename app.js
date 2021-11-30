const express = require("express");
const app = express();

const mongoose = require('mongoose');

const Post = require('./models/post');

app.use(express.json());

mongoose
.connect("mongodb+srv://teste:teste123@cluster1.e5ca4.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(
    () => {
        console.log('Connected to Database!');
    }
).catch(
    ()=>{
        console.log('Connection failed!');
    }
);

app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next)  => {

    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS")

    next();
})

app.post('/api/posts',(req,res, next)=>{

    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    
    console.log(post);

    //Saving to the Mongo database
    post.save(post).then( createdPost => {
        res.status(201).json({
            message: "Post created successfully!",
            postId: createdPost._id
        })
    });

    
})

app.get('/api/posts', (req, resp, next) => {

    Post.find().then(documents => {
        resp.status(200).json({
            message: 'Posts fecthed succesfully!!',
            posts: documents
        });
    });
    
});

app.delete('/api/posts/:id', (req, resp, next) =>{

    Post.deleteOne({_id: req.params.id}).then( result => {
        console.log(result);
        resp.status(201).json({ message: 'Post deleted!'});
    });       
        
});

module.exports = app;