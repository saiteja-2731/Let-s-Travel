let Post = require('../models/posts').Post ; 
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', async (req,resp)=>{
    let posts = await Post.find();
    resp.send(posts);
})

router.get('/:id', async (req,resp)=>{
    let id = req.params.id;
    let post = await Post.findOne({id:id});
    resp.send(post);
})

router.post('/',authMiddleware, async (req,resp)=>{
    let reqBody = req.body;

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date : new Date(),
        description : reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: reqBody.imageURL
    })
    await newPost.save();
    resp.send('Created');
})

router.delete('/:id',authMiddleware, async (req,resp) =>{
    let id = req.params.id;
    await Post.deleteOne({id:id});
    resp.send('Deleted');
})

router.put('/:id',authMiddleware, async(req,resp)=>{
    let id= req.params.id;
    await Post.updateOne({id:id},req.body);
    resp.send('Updated');
})

module.exports = router;