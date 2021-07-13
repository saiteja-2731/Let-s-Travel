let Post = require('../models/posts').Post ; 
let uniqid = require('uniqid');  // for giving unique-id to each post
let express = require('express');
let router = express.Router();   // redirecting routes from onefile to another file
let authMiddleware = require('../middleware/auth');  // for authentication

router.get('/', async (req,resp)=>{
    let posts = await Post.find();
    resp.send(posts);
})
// For selecting a particular post
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
        cost:reqBody.cost,
        country: reqBody.country,
        imageURL: reqBody.imageURL
    })
    await newPost.save();
    resp.send('Created');
})
// FOR DELETING A POST 
router.delete('/:id',authMiddleware, async (req,resp) =>{
    let id = req.params.id;
    await Post.deleteOne({id:id});
    resp.send('Deleted');
})

// FOR UPDATING
router.put('/:id',authMiddleware, async(req,resp)=>{
    let id= req.params.id;
    await Post.updateOne({id:id},req.body);
    resp.send('Updated');
})

module.exports = router;