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
app.get('/myjobs/:id', jobs.findAllById);
app.post('/jobs', jobs.addJob);
app.put('/jobs/:id', jobs.updateJob);
app.delete('/jobs/:id', jobs.deleteJob);

//User connections
app.get('/users', jobs.findAllUsers);
app.get('/login/', jobs.findUserById);
app.post('/users', jobs.addUser);
app.put('/users/:id', jobs.updateUser);
app.delete('/users/:id', jobs.deleteUser);
 
// connections
app.get('/communicate', jobs.findAllRequests);
app.get('/requests/:id', jobs.findAllRequestsById);
app.get('/communicate/:id', jobs.findRequestById);
app.post('/communicate', jobs.newRequest);
app.put('/communicate/:id', jobs.updateRequest);
app.delete('/communicate/:id', jobs.removeRequest);

app.listen(3000);
console.log('Listening on port 3000...');

