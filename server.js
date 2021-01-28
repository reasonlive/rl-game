const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');


const app = express();

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const router = require('./routes');

//app settings
app.use(express.static(path.join(__dirname, 'dev')));
app.use(serveStatic(path.join(__dirname,'dev'), {
	maxAge: '1d'
}))

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
	secret: 'sess+key+for+example',
	maxAge: 24 * 60 * 60 * 1000,
}))

//after changing this var clear all cookie from browser
const singleMode = true;






app.use('/', router, function (req, res,next) {
	
	if(req.headers && req.headers.cookie && !req.headers.cookie.match('singleMode')){
		res.cookie('singleMode',singleMode, { maxAge: 900000, httpOnly: true })
	}
	if(res.headersSent)return;
  res.sendFile(path.join(__dirname, 'dev', 'index.html'));
});


app.use(function(err,req,res,next){
	
	console.error(err);
})

app.listen(3000, function(){
	console.log('server is running on port 3000');
});

