const express = require('express');
const path = require('path');
const fs = require('fs');

const server = express();

server.use(express.static(path.join(__dirname, 'dev')));


server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dev', 'index.html'));
});

server.listen(3001, function(){
	console.log('server is running')
});

