let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let callbackRequestSchema = new Schema ({
    id: String,
    phoneNumber : String,
    date : Date
});

let CallbackRequest = mongoose.model('CallbackRequest',callbackRequestSchema,'callback-requests');//3rd argument is specifying the collection name where data will be stored


module.exports = {CallbackRequest};