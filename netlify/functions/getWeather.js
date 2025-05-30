const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { lat, lon, city } = event.queryStringParameters;
  const apiKey = process.env.WEATHER_API_KEY;

  let url = '';
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  } else {
    return { statusCode: 400, body: 'Missing location parameters' };
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Error fetching weather data',
    };
  }
};
