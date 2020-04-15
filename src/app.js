const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
const app = express();
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
// console.log(partialPath);

// Set up views and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
// Set up static directories to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Bobby Ferrer'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About page',
		name: 'Bobby Ferrer'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			// console.log(forecastData);
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is help page app',
		name: 'Bobby Ferrer',
		title: 'Help page'
	});
});
app.get('/help/*', (req, res) => {
	res.render('404', {
		message: 'Help Article not found',
		name: 'Bobby Ferrer',
		title: '404'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		message: 'My 404 page',
		name: 'Bobby Ferrer',
		title: '404'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
