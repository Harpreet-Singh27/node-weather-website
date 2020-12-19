const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiaGFwcHlzYWhvdGE5OCIsImEiOiJja2loNnh2bjUwNHJnMnJtd2R2OWYzbW1qIn0.HW9HxOeXJbJPKvtpRIKP8A&limit=1';

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Error while connecting geocoding services', undefined);
    } else if (response.body.features.length == 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
