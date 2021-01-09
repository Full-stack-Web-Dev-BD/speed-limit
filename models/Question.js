const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const qSchema=new Schema({
    space:{
        type:String,
        required:true
    },      
    title:{
        type:String,
        required:true
    },      
    content:{
        type:String,
        required:true
    },    
    answer:{
        type:Array,
        default:[]
    },     
    up:{
        type:Array,
        default:[]
    },         
    creatorid:{
        type:String,
        required:true
    },  
    creatorName:{
        type:String,
        required:true
    },
    time:{
        type:String,
        default:`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
    },
})

module.exports=Question=mongoose.model('Question',qSchema);