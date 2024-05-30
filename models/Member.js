const mongoose = require('mongoose')

const Member = mongoose.Schema({
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Team',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'Member'
    }
})

module.exports = mongoose.model('Member',Member)