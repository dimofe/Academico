

'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	EventoSchema = new Schema({
	lugar: String,
	fecha: String,
	hora: String,
	participantes: String
	
	});

module.exports = mongoose.model('Evento', EventoSchema);