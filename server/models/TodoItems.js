//import mongoose to create new Schema
const mongoose = require("mongoose");

//create Schema
const TodoItemSchema = new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now
    }
})


//export this Schema
module.exports = mongoose.model('todo', TodoItemSchema);
