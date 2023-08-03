const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;

exports.getWeather  = async (req, res) => {
  const location = req.body.city;

  console.log("location",location);


  if (!location) {
    return res.status(400).send({ error: 'Location not provided' });
  }

  try {

    // const existingWeatherData = await monsoondata.findOne({ name: { $regex: new RegExp(location, 'i') } });

  
    const response = await axios.get(apiUrl, {
        params: {
          q: location,
          appid: apiKey,
        },
      });

      const weatherData = response.data;

      console.log("Sending weather data:", weatherData);

      return res.json({ message: 'Weather data created successfully', data: weatherData });

  } catch (error) {
    return res.status(500).send({ error: 'Error fetching or updating weather data' });
  }
};
