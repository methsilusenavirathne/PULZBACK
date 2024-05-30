const mongoose = require('mongoose')

const Team = mongoose.Schema({
    school:{
        type:String,
        required:true
    },
    TICName:{
        type:String,
        required:true
    },
    TICMobile:{
        type:String,
        required:true
    },
    competition:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Team',Team)