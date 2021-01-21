const express = require('express');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const router = require('./routes');

//app settings
app.use(express.static(path.join(__dirname, 'dev')));

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
	secret: 'sess+key+for+example',
	maxAge: 24 * 60 * 60 * 1000,
}))






app.use('/', router, function (req, res,next) {
	if(res.headersSent)return;
  res.sendFile(path.join(__dirname, 'dev', 'index.html'));
});


app.use(function(err,req,res,next){
	console.log('from last error handler');
	console.error(err);
})

app.listen(3000, function(){
	console.log('server is running on port 3000');
});

