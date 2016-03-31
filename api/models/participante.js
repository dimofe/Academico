

'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	ActorSchema = new Schema({
	name: String,
	lastName: String,
	country: String,
	age: String
});

module.exports = mongoose.model('Actor', ActorSchema);