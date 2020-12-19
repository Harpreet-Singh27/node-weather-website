const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=58e6dd9959dbed9c390ef65353c7a903&units=metric`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Error occurred!!!!!');
    } else if (response.body.message) {
      callback('Unable to find location');
    } else {
      const current = response.body.current;
      const weather = response.body.current.weather;
      console.log(response.body);
      callback(undefined, {
        current: current,
        weather: weather,
      });
    }
  });
};

module.exports = forecast;
