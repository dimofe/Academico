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
	// create a beer (http://localhost:8080/api/beers)
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
	// get a beer by id (http://localhost:8080/api/participantes/:participant_id)
	.get((req, res) => {
		Participante.findById(req.params.participant_id, (err, participant) => {
			if (err) res.send(err);
			res.json(participant);
		});
	})

	// update a participant by id (http://localhost:8080/api/participantes/:participant_id)
	.put((req, res) => {
		Beer.findById(req.params.participant_id, (err, participant) => {
			if (err) res.send(err);
			// update info
			participante.name = req.body.name;
			participante.country = req.body.country;
			participante.genre = req.body.genre;
			// save beer
			beer.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Participant updated!' });
			});
		});
	})

	// delete a participant by id (http://localhost:8080/api/participantes/:participant_id)
	.delete((req, res) => {
		Beer.remove({ _id: req.params.participant_id }, (err, participant) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});

// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

// on routes that end in /beers
apiRouter.route('/movies')
	// create a beer (http://localhost:8080/api/beers)
	.post((req, res) => {
			let movie = new Movie();
			movie.name = req.body.name;
			movie.actor = req.body.actor;
			movie.actress = req.body.actress;
			movie.save(err => {
					if (err) res.send(err);
						res.json({ message: 'Movie created!' });
					});
		})
	// get all movies (http://localhost:8080/api/beers)
		.get((req, res) => {
			Movie.find((err, movies) => {
					if (err) res.send(err);
					res.json(movies);
			});
		});

//actor and actreess aprox search
apiRouter.route('/movies/actor/query')
	.get((req,res)=> {
		let actorString = req.query.actor;
		Movie.find({"actor":{"$regex": actorString}},(err,movies) => {
			if (err) res.send(err);
			res.json(movies);
		})
	});

apiRouter.route('/movies/actress/query')
	.get((req,res)=> {
	let actorString = req.query.actress;
Movie.find({"actor":{"$regex": actorString}},(err,movies) => {
	if (err) res.send(err);
res.json(movies);
})
});

// on routes that end in /movies/:beer_id
apiRouter.route('/movies/:movie_id')
	// get a movie by id (http://localhost:8080/api/movies/:movie_id)
	.get((req, res) => {
	Movie.findById(req.params.movie_id, (err, movie) => {
	if (err) res.send(err);
res.json(movie);
});
})
// update a movie by id (http://localhost:8080/api/movies/:movie_id)
.put((req, res) => {
	Movie.findById(req.params.beer_id, (err, movie) => {
	if (err) res.send(err);
// update info
movie.name = req.body.name;
movie.actor = req.body.actor;
movie.actress = req.body.actress;
// save movie
movie.save(err => {
	if (err) res.send(err);
res.json({ message: 'Movie updated!' });
});
});
})
// delete a movie by id (http://localhost:8080/api/movies/:movie_id)
.delete((req, res) => {
	Movie.remove({ _id: req.params.movie_id }, (err, movie) => {
	if (err) res.send(err);
res.json({ message: 'Successfully deleted!'});
});
});



// register our routes
// all routes will be prefixed with /api
app.use('/api', apiRouter);



// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
