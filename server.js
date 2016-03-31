'use strict';

// server.js (Express 4.0)

let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/examen2',
		port = process.env.PORT || 8080;

mongoose.connect(dbURI);

let Participante = require('./api/models/participante');
let Evento= require('./api/models/evento');

// DEFINE THE MIDDLEWARE FOR APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
let apiRouter = express.Router();

// MIDDLEWARE to use for all requests
apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();// don't stop here, go to next route
});

// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

apiRouter.route('/participantes')
	// create a participant (http://localhost:8080/api/participantes)
	.post((req, res) => {
		let participante = new Participante();
		participante.name = req.body.name;
		participante.country = req.body.country;
		participante.genre = req.body.genre;
		participante.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Participante creado!' });
		});
	})
	// get all participants (http://localhost:8080/api/participantes)
	.get((req, res) => {
		Participante.find((err, participantes) => {
			if (err) res.send(err);
			res.json(participantes);
		});
	});

apiRouter.route('/participantes/:participant_id')
	// get a participant by id (http://localhost:8080/api/participantes/:participant_id)
	.get((req, res) => {
		Participante.findById(req.params.participant_id, (err, participant) => {
			if (err) res.send(err);
			res.json(participant);
		});
	})

	// update a participant by id (http://localhost:8080/api/participantes/:participant_id)
	.put((req, res) => {
		Participante.findById(req.params.participant_id, (err, participant) => {
			if (err) res.send(err);
			participant.name = req.body.name;
			participant.country = req.body.country;
			participant.genre = req.body.genre;
			participant.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Participant updated!' });
			});
		});
	})

	// delete a participant by id (http://localhost:8080/api/participantes/:participant_id)
	.delete((req, res) => {
		Participante.remove({ _id: req.params.participant_id }, (err, participant) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});

// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

//****************----------------*****************-----------------*****************--------------***************-----------------

apiRouter.route('/eventos')
	// create a event (http://localhost:8080/api/eventos)
	.post((req, res) => {
		let evento = new Evento();
		evento.name = req.body.name;
		evento.date = req.body.date;
		evento.type = req.body.type;
		evento.participants = req.body.participants;
		evento.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Evento creado!' });
		});
	})
	// get all events (http://localhost:8080/api/eventos)
	.get((req, res) => {
		Evento.find((err, eventos) => {
			if (err) res.send(err);
			res.json(eventos);
		});
	});

apiRouter.route('/eventos/:event_id')
	// get a event by id (http://localhost:8080/api/events/:event_id)
	.get((req, res) => {
		Evento.findById(req.params.event_id, (err, event) => {
			if (err) res.send(err);
			res.json(event);
		});
	})

	// update an event by id (http://localhost:8080/api/events/:event_id)
	.put((req, res) => {
		Evento.findById(req.params.event_id, (err, event) => {
			if (err) res.send(err);
			evento.name = req.body.name;
			evento.date = req.body.date;
			evento.type = req.body.type;
			evento.participants = req.body.participants;
			event.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Event updated!' });
			});
		});
	})

	// delete an event by id (http://localhost:8080/api/events/:event_id)
	.delete((req, res) => {
		Evento.remove({ _id: req.params.event_id }, (err, event) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});

// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

//**************---------------------------***********************--------------------------*******************---------------
// delete an event by id (http://eventos/participantsName/:name)
apiRouter.get('/eventos/participantsName/:name', function(req, res) {
		Evento.find({'participants': {'$regex': req.params.name}}, (err, event) => {
		if (err) res.send(err);
		res.json(event);
	});
})

// register our routes
// all routes will be prefixed with /api
app.use('/api', apiRouter);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
