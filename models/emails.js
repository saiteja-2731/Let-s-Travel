let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let emailSchema = new Schema ({
    id : String,
    name: String,
    email : String,
    text : String,
    date : Date
});

let Email = mongoose.model('Email',emailSchema,'emails');//3rd argument is specifying the collection name where data will be stored


module.exports = {Email};