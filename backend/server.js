// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // npm install node-fetch@2

const app = express();
app.use(cors());
app.use(express.json());

const GEOAPIFY_API_KEY = 'c534d686afa54d54b720e94698b447cd'; // <-- wpisz swój klucz Geoapify

// Endpoint do pobierania restauracji
app.get('/restaurants', async (req, res) => {
  const { lat = 50.0413, lon = 21.9990, radius = 1000 } = req.query;

  const url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${GEOAPIFY_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // mapujemy na prostszy format
    const restaurants = data.features.map((place) => ({
      id: place.properties.place_id,
      name: place.properties.name,
      cuisine: place.properties.cuisine || 'N/A',
      address: place.properties.formatted,
      lat: place.properties.lat,
      lon: place.properties.lon,
    }));

    res.json(restaurants);
  } catch (error) {
    console.error('Błąd pobierania restauracji:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Testowy endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));