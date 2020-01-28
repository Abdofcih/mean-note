const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        trim:true
    },
    body:{
        type:String,
        trim:true
    },
    isfavourite:{
       type:Boolean,
       default:false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    }
},{
    timestamps:true
})
const Note = mongoose.model('notes',noteSchema)

module.exports = Note
