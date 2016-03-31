'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	EventoSchema = new Schema({
	name: String,
	date: String,
	type: String,
	participants: String

	});

module.exports = mongoose.model('Evento', EventoSchema);