'use strict';

console.log("Hello World");

let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/test',
		port = process.env.PORT || 8080;

//connect to DB
mongoose.connect(dbURI);
let Actor = require('./app/api/models/actor');
let Movie = require('./app/api/models/movie');
//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let apiRouter = express.Router();

apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();   // don't stop here, go to next route
});

apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

apiRouter.route('/actor')
	// create an actor (http://localhost:8080/api/actor)
	.post((req, res) => {
		let actor = new Actor();

		actor.name = req.body.name;
		actor.lastName = req.body.lastName;
		actor.country = req.body.country;
		actor.age = req.body.age;

		actor.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Actor created!' });
		});
	})

		.get((req, res) => {
		Actor.find((err, actor) => {
			if (err) res.send(err);
			res.json(actor);
		});
	});


	apiRouter.route('/actor/:actor_id')
	// get an actor by id (http://localhost:8080/api/actor/:actor_id)
	.get((req, res) => {
		Actor.findById(req.params.actor_id, (err, actor) => {
			if (err) res.send(err);
			res.json(actor);
		});
	})

	apiRouter.get('/actor/nameStartsWith/:name', function(req, res) {
			Actor.find({'name': {'$regex': req.params.name}}, (err, actor) => {
			if (err) res.send(err);
			res.json(actor);
		});
	})


apiRouter.route('/movie')
	// create a movie (http://localhost:8080/api/movie)
	.post((req, res) => {
		let movie = new Movie();

		movie.name = req.body.name;
		movie.actors = req.body.actors;
		movie.year = req.body.year;
		movie.genre = req.body.genre;

		movie.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Movie created!' });
		});
	})

		.get((req, res) => {
		Movie.find((err, movie) => {
			if (err) res.send(err);
			res.json(movie);
		});
	});


app.use('/api', apiRouter);

app.listen(port);
console.log('Magic happens on port ' + port); 	