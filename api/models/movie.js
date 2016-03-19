

'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	MovieSchema = new Schema({
	name: String,
	year: String,
	genre: String,
	actors: [{ name: String }]

});

module.exports = mongoose.model('Movie', MovieSchema);