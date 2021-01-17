const express = require('express');
const router = express.Router();


router.get('/', function(req,res){
	console.log(req)
})

router.post('/login', function(req,res){
	console.log(req)
})

router.post('/registration', function(req,res){
	console.log(req)
})

router.get('/stat', function(req,res){
	console.log(req)
})

router.get('/game/:id', function(req,res){
	console.log(req)
})



module.exports = router;