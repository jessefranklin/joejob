var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('yep');

});

var jobsSchema = mongoose.Schema({
    'name': String,
    'serviceName': String,
    'serviceDesc': String,
    'date': { type: Date, default: Date.now },
    'dateRequired': Date,
    'location': {
        'address': String,
        'lat': Number,
        'long': Number
    },
    'cost': {
        'type':String,
        'hours': Number,
        'amount': Number
    },
    'applicants': {
        'status':String,
        'id': Number
    },
    'category': String
});

var job = mongoose.model('job', jobsSchema);

