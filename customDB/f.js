const db = require('./index.js');
const base = db('base', 'users');

const fs = require('fs');

let file = fs.readFileSync(__dirname+'/example.json', 'utf8');


const value = /12a033e137f45b2b82cfbe22 \}/m;

const start = 'users';//value.toString();
const end = value.toString();

function getSubstring(start,end){
	return file.substring(start,end);
}

console.log(file.match(value))

/*const startIndex = file.match(start).index;
const endIndex = file.match(end).index;*/

//let finalstr = getSubstring(startIndex+9,endIndex+value.length+1);
//finalstr = finalstr.concat('}')
//console.log(finalstr.length)
//console.log(getSubstring(startIndex+9,endIndex+value.length))






