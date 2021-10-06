const express = require("express");
const app = express();

app.use(express.json());
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

    const post = req.body;

    console.log(post);
    res.status(201).json({
        message: "Post created successfully!"
    });
})

app.get('/api/posts', (req, resp, next) => {

    const posts = [
        {
            id: '1',
            title: 'First server side post',
            content: 'This is coming from the server'
        },
        {
            id: '2',
            title: 'Second server side post',
            content: 'This is coming from the server too!'
        }
    ];

    resp.status(200).json({
        message: 'Posts fecthed succesfully!!',
        posts: posts
    });
});

module.exports = app;