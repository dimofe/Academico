'use strict';

// server.js (Express 4.0)

// BASE SETUP
// ==============================================

// call the packages we need
let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/test',
		port = process.env.PORT || 8080;

// connect to mongodb
mongoose.connect(dbURI);

// 
let Beer = require('./app/api/models/beer');
let Movie= require('./app/api/models/movie');


// DEFINE THE MIDDLEWARE FOR APP
// ==============================================

// configure app to use bodyParser()
// this will let us get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES
// ==============================================

// get an instance of the express router
let apiRouter = express.Router();

// test router
// apiRouter.get('/', (req, res) => {
// 	res.json({ message: 'welcome to out api' });
// });

// MIDDLEWARE to use for all requests
apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();   // don't stop here, go to next route
});

// routes 
// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

// on routes that end in /beers
apiRouter.route('/beers')
	// create a beer (http://localhost:8080/api/beers)
	.post((req, res) => {
		let beer = new Beer();

		beer.name = req.body.name;
		beer.type = req.body.type;
		beer.country = req.body.country;

		beer.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Beer created!' });
		});
	})
	// get all beers (http://localhost:8080/api/beers)
	.get((req, res) => {
		Beer.find((err, beers) => {
			if (err) res.send(err);
			res.json(beers);
		});
	});

// on routes that end in /beers/:beer_id
apiRouter.route('/beers/:beer_id')
	// get a beer by id (http://localhost:8080/api/beers/:beer_id)
	.get((req, res) => {
		Beer.findById(req.params.beer_id, (err, beer) => {
			if (err) res.send(err);
			res.json(beer);
		});
	})
	// update a beer by id (http://localhost:8080/api/beers/:beer_id)
	.put((req, res) => {
		Beer.findById(req.params.beer_id, (err, beer) => {
			if (err) res.send(err);
			// update info
			beer.name = req.body.name;
			beer.type = req.body.type;
			beer.country = req.body.country;
			// save beer
			beer.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Beer updated!' });
			});
		});
	})
	// delete a beer by id (http://localhost:8080/api/beers/:beer_id)
	.delete((req, res) => {
		Beer.remove({ _id: req.params.beer_id }, (err, beer) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});




// routes -movies
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
