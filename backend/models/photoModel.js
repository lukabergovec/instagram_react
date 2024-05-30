var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'name' : String,
	'path' : String,
	'postedBy' : {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'reports' : { type: Number, default: 0 },
	'likes' : { type: Number, default: 0 },
	'date' : Date,
	'disabled' : false,
	'tags' : Array
});

module.exports = mongoose.model('photo', photoSchema);
