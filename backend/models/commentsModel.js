var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var commentsSchema = new Schema({
	'comm' : String,
	'date' : Date,
	'img_id' : String,
	'img_owner' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('comments', commentsSchema);
