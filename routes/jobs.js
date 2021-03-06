var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('jobdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'jobdb' database");
        db.collection('jobs', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'jobs' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateUsersDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving job: ' + id);
    db.collection('jobs', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAllById = function(req, res) {
    var id = req.params.id;
    //console.log('Retrieving job: ' + id);
    db.collection('jobs', function(err, collection) {
        collection.find({'owner': id}).toArray(function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('jobs', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addJob = function(req, res) {
    var job = req.body;
    console.log('Adding job: ' + JSON.stringify(job));
    db.collection('jobs', function(err, collection) {
        collection.insert(job, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
 
exports.updateJob = function(req, res) {
    var id = req.params.id;
    var job = req.body;
    console.log('Updating job: ' + id);
    console.log(JSON.stringify(job));
    db.collection('jobs', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, job, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating job: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(job);
            }
        });
    });
};
 
exports.deleteJob = function(req, res) {
    var id = req.params.id;
    console.log('Deleting job: ' + id);
    db.collection('jobs', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var jobs = [
    {
    'name': 'Tom',
	'serviceName': 'Help Move',
	'dateRequired':'Feb 15, 2014',
	'serviceDesc': 'Need help moving fridge out of house',
	'location': {
		'address': '21 Ruttan St.',
        'lat': '48.444514',
		'long': '-89.217045',
		'majorIntersection':'Dundas / Bloor'
	},
	'cost': {
		'type':'Fixed',
		'hours':'4-6',
		'amount':'90'
	},
	'category': 'Manual Labour, Junk Removal'
	},
    {
	'name': 'Jill',
	'serviceName': 'Need Gardener',
	'dateRequired':'Feb 15, 2014',
	'serviceDesc': 'Tend to Garden once a month',
	'location': {
        'address': '21 Ruttan St.',
		'lat': '48.444414',
		'long': '-89.217045',
		'majorIntersection':'Dundas / Roncesvalle'
	},
	'cost': {
		'type':'Per Hour',
		'hours':'8',
		'amount':'90'
	},
	'category': 'Manual Labour, Junk Removal'
	}];
 
    db.collection('jobs', function(err, collection) {
        collection.insert(jobs, {safe:true}, function(err, result) {});
    });
 
};





exports.findUserById = function(req, res) {
    var name = req.body.name;
    //console.log(req);
    db.collection('users', function(err, collection) {
        collection.find({'name': name}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAllUsers = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addUser = function(req, res) {
    var user = req.body;
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
 
exports.updateUser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log('Updating job: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating job: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
};
 
exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateUsersDB = function() {
 
    var users = [
    {
    'name': 'Jesse',
    'password': '123',
    'role': 'Admin',
    'date': Date.now,
    'jobs': {
        'id':123,
        'status':'8',
        'applicants': 123
    }
    }];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};
