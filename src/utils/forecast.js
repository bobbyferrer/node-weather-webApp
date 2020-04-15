const request = require('request');

const forecast = (longitude, latitude, callback) => {
	const url = `https://api.darksky.net/forecast/5b5c7a902fbdc705f355f6351e5da8de/${longitude},${latitude}?units=si&lang=en`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			callback(
				undefined,
				`${body.daily.data[0].summary} It is currently ${body.currently
					.temperature} degress out. There is ${body.currently.precipProbability}% change of rain`
			);
		}
	});
};

module.exports = forecast;
