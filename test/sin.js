const sinon = require('sinon');

const DataFetcher = require('../controllers');
const Base = require('../customDB');


const server = sinon.fakeServer.create();
console.log(server);



const users = new Base('base', 'users');
const bames = new Base('base', 'games');


const fetcher = new DataFetcher();

fetcher.add('user', {name:'hello', email: 'hello@mail.ru', password: 'mypass'}).then(res=>console.log(res));



//users.drop()

