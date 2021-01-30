const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//database fetcher api
const dataFetcher = require('../controllers');
const fetcher = new dataFetcher();

// entry requests
router.use(function(req,res,next){
	if(req.method === 'post' && req.headers['sec-fetch-mode'] === 'navigate'){
		console.log('request was made by browser')
		return next(new Error('browser query request!'));
	}

	next();
})

router.post('/login', async function(req,res,next){
	let mode = req.headers.cookie && req.headers.cookie.match(/singleMode=(.*)/)[1];


	if(req.body && req.body.email && req.body.password){

		let ipLog = {
			date: new Date(),
			ip: req.client.remoteAddress
		}

		let user = await fetcher.loginUser({email:req.body.email, password:req.body.password, ipLog});
		user.mode = mode;
		if(user instanceof Error){
			res.json({error:user.message})
		}

		//set up jwt token and attach it to the session
		let payload = {
			name: user.name,
			id: user.id,
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
		}

		const token = jwt.sign(payload, 'jwt_key_0110');
		req.session.t = token;

		res.json(user);
	}
	next();
})

router.get('/logout', async function(req,res,next){
	let user = await getSessionUserInfo(req);
	if(!user){
		next();
	}
	req.session = null;
	next()
})

router.post('/registration', async function(req,res,next){
	console.log(`registration: ${req.body}`)
	if(req.body){

		let ipLog = {
			date:new Date(),
			ip:req.client.remoteAddress
		};

		try{
			let result = await fetcher.add('user',{...req.body,lastIpLog:ipLog});
			if(!result || result instanceof Error){
				res.send('failure');
				return next(result);
			}
			res.send('success');
		}catch(e){
			res.send('failure');
			next(e);
		}
	}
	next()
})

router.get('/isLogged', async function(req,res,next){
	console.log('request for checking session')

	const loggedUser = await getSessionUserInfo(req);

	if(!loggedUser)res.json({logged:false});
	else res.json({logged:true});

	next();

})

//offerground requests 

router.get('/stat', async function(req,res,next){
	console.log('request all games')
	try{
		let result = await fetcher.all('games');
		if(!result || result instanceof Error)
			return next(new Error('500:Server error'));

		result = Array.isArray(result) && result.filter(obj=> obj.finished == true);

		res.json(result);
	}catch(e){
		next(e);
	}

	next() //NOTE
})

router.get('/offers', async function(req,res,next){
		console.log('request all offers');
		try{
			let result = await fetcher.all('games');
			if(!result || result instanceof Error)
				return next(new Error('500:Server error'));

			result = Array.isArray(result) && result.filter(obj => obj.finished == false);

			res.json(result);
		}catch(e){
			next(e);
		}
})


//game requests
//first entry to the game 
router.get('/game', async function(req,res,next){
	/*if(req.headers['sec-fetch-mode'] === 'navigate'){
		console.log('request was made by user');
		res.redirect('/offerground');
		next();
	}*/
	if(!req.query.id){
		res.redirect('/offerground');
		return next();
	}
	
	if(checkOnId(req.query.id)){
		let user = await getSessionUserInfo(req);
		if(!user)return next();
		console.log('user '+user.name+' came into the game');
		let game = await fetcher.get('game', req.query.id);
		console.log(game)
		if(!game)return next();

		
		let players = game.players;
		if(players.length > 1){
			//req.session = null;
			//res.redirect('/');
			return next();
		}else{
			console.log('second added');
			players.push(user.name);
			await fetcher.update('game', req.query.id,{players:players,finished:true});
		}
		
		
	}
	
	
	next();
	
})

router.get('/game/players', async function(req,res,next){
	if(req.query.id){
		//let result = await fetcher.get('games')
	}
})

router.post('/game/create', async function(req,res,next){
	console.log('creates game')
	if(req.body){
		console.log(req.body)
		try{
			let result = await fetcher.add('game',req.body);
			console.log(result)
			if(!result || result instanceof Error){
				res.send('failure');
				return next(new Error('500:Server error'));

			}
			else{
				res.json({id:result});
				//res.redirect('/game?id='+result);
				
				
			}
		}catch(e){
			next(e);
		}
	}
	next();
})

router.post('/game/update', async function(req,res,next){
	console.log('updates game');
	if(req.body && req.body.id){
		try{
			let result = await fetcher.update('game', req.body.id,{finished:req.body.finished});
			if(result instanceof Error){
				res.send('failure');
				return next(new Error('500:Server error'));
			}else{
				res.send('success');
				//res.redirect('/offerground');
			}

		}catch(e){
			next(e);
		}
	}
	next();
})

router.post('/game/delete', async function(req,res,next){
	console.log('deletes game');
	if(req.body && req.body.id){
		try{
			let result = await fetcher.delete('game',req.body.id);
			if(!result || result instanceof Error){
				res.send('failure');
				return next(new Error('500:Server error'));

			}
			else{
				res.send('success');
				next();
			}
		}catch(e){
			next(e);
		}
	}
	next();
})


module.exports = router;


//helper for getting session token and decoding that into user data
 async function getSessionUserInfo(req){

		let cke = (req && req.session && req.session.t) ? req.session.t : '';
		if(!cke)return null;
		let body = await jwt.verify(cke, 'jwt_key_0110');
		return body;
}

//check if value is id
function checkOnId(value){
	return value.match(/^[0-9abcdef]{24}$/) ? true : false;
}

