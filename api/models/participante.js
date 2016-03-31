'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	ParticipanteSchema = new Schema({
	name: String,
	country: String,
	genre: String
});

module.exports = mongoose.model('Participante', ParticipanteSchema);