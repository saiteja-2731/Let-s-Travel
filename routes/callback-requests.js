let CallbackRequest = require('../models/callback-requests').CallbackRequest;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req,resp)=>{ //id 2nd argument is true then 3rd argument will be executed
    resp.send(await CallbackRequest.find());
});

// For inserting a call back into DB
router.post('/', async (req,resp)=>{
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id:uniqid(),
        phoneNumber : reqBody.phoneNumber,
        date : new Date()
    })
    await newRequest.save();  // saving it to DB
    resp.send('Accepted');
});

//for deleting
router.delete('/:id',authMiddleware, async (req,resp)=>{
    await CallbackRequest.deleteOne({id:req.params.id});
    resp.send('Deleted');
});

module.exports = router;