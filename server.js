'use strict';

var express = require('express'),
    jobs = require('./routes/jobs');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(function (req, res, next) {
	    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:9000');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	    res.setHeader('Access-Control-Allow-Credentials', true);
	    next();
		});
	});
 
app.get('/jobs', jobs.findAll);
app.get('/jobs/:id', jobs.findById);
app.post('/jobs', jobs.addJob);
app.put('/jobs/:id', jobs.updateJob);
app.delete('/jobs/:id', jobs.deleteJob);

app.get('/users', jobs.findAllUsers);
app.get('/users/:id', jobs.findUserById);
app.post('/users', jobs.addUser);
app.put('/users/:id', jobs.updateUser);
app.delete('/users/:id', jobs.deleteUser);
 
app.listen(3000);
console.log('Listening on port 3000...');

