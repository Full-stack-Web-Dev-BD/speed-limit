const Question = require('../models/Question');

const questionRouter = require('express').Router();



questionRouter.post('/ask', (req, res) => {
	new Question(req.body)
		.save()
		.then(doc => {
			return res.json(doc)
		})
		.catch(err => {
			console.log(err);
			return res.json(err)
		})
});
questionRouter.get('/get-single-question/:id', (req, res) => {
	Question.findOne({ _id: req.params.id })
		.then(doc => {
			return res.json(doc)
		})
		.catch(err => {
			console.log(err);
			res.json(err)
		})
})
questionRouter.get('/all-question', (req, res) => {
	Question.find()
		.then(doc => {
			return res.json(doc)
		})
		.catch(err => {
			console.log(err);
			res.json(err)
		})
})
questionRouter.post('/update-question/:id', (req, res) => {
	Question.findOneAndUpdate({ _id: req.params.id }, req.body)
		.then(doc => {
			return res.json(doc)
		})
		.catch(err => {
			console.log(err);
			res.json(err)
		})
})
questionRouter.get('/delete/:id', (req, res) => {
	Question.findByIdAndDelete(req.params.id)
		.then(doc => {
			return res.json(doc)
		})
		.catch(err => {
			console.log(err);
			res.json(err)
		})
})


// Make Vote
questionRouter.post('/up/:id', (req, res) => {
	Question.findOne({ _id: req.params.id })
		.then(doc => {
			let exVote = doc.up
			exVote.push(req.body.uid)
			doc.up = exVote
			doc.save()
				.then(updated => {
					return res.json(updated)
				})
				.catch(err => {
					console.log(err);
					res.json(err)
				})
		})
})

questionRouter.get('/sort', (req, res) => {
	Question.find()
		.then(doc => {
			let sorted = doc.sort(function (a, b) {
				return parseFloat(a.answer.length) - parseFloat(b.answer.length);
			});
			res.json(sorted)
		})
		.catch(err => {
			console.log(err);
		})
})

questionRouter.post('/filter', (req, res) => {
	console.log(req.body);
	Question.find({space:req.body.space})
		.then(doc => {
			return res.json(doc)
		})
		.catch(err => {
			console.log(err);
		})
})
module.exports = questionRouter;