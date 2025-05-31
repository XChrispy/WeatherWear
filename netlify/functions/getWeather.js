export async function handler(event) {
  const { lat, lon, city } = event.queryStringParameters;
  const apiKey = process.env.WEATHER_API_KEY;

  console.log('Incoming request:', { lat, lon, city });
  console.log('Using API key:', apiKey ? '✅ Present' : '❌ MISSING');

  let url = '';
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  } else {
    console.log('❌ No location parameters provided.');
    return { statusCode: 400, body: 'Missing parameters' };
  }

  console.log('Fetching:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('Received data:', data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('❌ Error fetching from OpenWeather:', err);
    return {
      statusCode: 500,
      body: 'Error fetching weather data',
    };
  }
}
