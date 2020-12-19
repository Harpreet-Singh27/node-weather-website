const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

//defining paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setting up static directory to serve
app.use(express.static(publicDirectory));

//setting handlebars ans views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Index Page',
    name: 'Harpreet Singh',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Harpreet Singh',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is my message',
    title: 'Help',
    name: 'Harpreet Singh',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address',
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      // console.log(error);
      return res.send({
        error: error,
      });
    }
    // console.log(error);
    // console.log(data);
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        // console.log(error);
        return res.send({
          error: error,
        });
      }
      // console.log(data.location);
      // console.log(forecastData.current, forecastData.weather);

      res.send({
        location: data.location,
        forecast: forecastData.current,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  // res.send('Help page not found');
  res.render('404', {
    error: 'Help article not found',
    title: '404',
    name: 'Harpreet Singh',
  });
});

app.get('/products', (req, res) => {
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  // res.send('My 404 page');
  res.render('404', {
    error: 'Page not found',
    title: '404',
    name: 'Harpreet Singh',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
