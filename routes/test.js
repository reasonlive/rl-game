const curl = require('curl');

const path = 'http://localhost:3000';

curl.get(path+'/game/', {}, function(err, res,body){
	if(err)console.log(err);
	console.log(`response: ${res}`);
	console.log('body: '+body);
});