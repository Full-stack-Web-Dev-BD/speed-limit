const Answer = require('../models/Answer');
const Question = require('../models/Question');
const answerRouter=require('express').Router();



answerRouter.post('/', (req,res)=>{
	console.log(req.body);
	new Answer(req.body)
	.save()
	.then(doc=>{
		Question.findOne({_id:req.body.qid})
		.then(doc=>{
			let  exAns=doc.answer
			exAns.push(req.body.uid)
			doc.answer=exAns
			doc.save()
			.then(updated=>{
				return res.json(updated)
			})
			.catch(err=>{
				console.log(err);
				res.json(err)
			})
		})
		return res.json(doc)
	})
	.catch(err=>{
		return res.json(err)
	})
});
answerRouter.get('/get-single-question-answer/:id',(req,res)=>{
	Answer.find({qid:req.params.id})
	.then(doc=>{
		console.log(doc);
		return res.json(doc)
	})
	.catch(err=>{
		res.json(err)
	})
})
answerRouter.get('/delete-answer/:id',(req,res)=>{
	Answer.findByIdAndDelete(req.params.id)
	.then(doc=>{
		return res.json(doc)
	})
	.catch(err=>{
		res.json(err)
	})
})
module.exports=answerRouter;