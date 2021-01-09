const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const answerchema=new Schema({
	qid:{
		type:Schema.Types.ObjectId,
		required:true
	},
	uid:{
		type:Schema.Types.ObjectId,
		required:true
	},
	userName:{
		type:String,
		required:true
	},
	answer:{
		type:String,
		required:true
	},
    time:{
        type:String,
        default:`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
    },
})

module.exports=Answer=mongoose.model('Answer',answerchema);