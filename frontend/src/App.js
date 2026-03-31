import React, { useEffect, useState } from 'react';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState('50.0413'); // domyślne współrzędne
  const [lon, setLon] = useState('21.9990');
  const [radius, setRadius] = useState('1000'); // promień w metrach

  // Funkcja pobierania restauracji z serwera
  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/restaurants?lat=${lat}&lon=${lon}&radius=${radius}`
      );
      const data = await res.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Błąd pobierania restauracji:', error);
    } finally {
      setLoading(false);
    }
  };

  // Pobranie domyślnych restauracji przy uruchomieniu
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Restaurant Explorer</h1>

      {/* Formularz filtracji */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Latitude:{' '}
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            style={{ width: '100px' }}
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Longitude:{' '}
          <input
            type="text"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            style={{ width: '100px' }}
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Radius (m):{' '}
          <input
            type="text"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            style={{ width: '80px' }}
          />
        </label>
        <button
          onClick={fetchRestaurants}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Load Restaurants
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {restaurants.length === 0 && !loading && <p>No restaurants found.</p>}

      {restaurants.map((r) => (
        <div
          key={r.id}
          style={{
            border: '1px solid #ccc',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <h3>{r.name}</h3>
          <p>Cuisine: {r.cuisine}</p>
          <p>Address: {r.address}</p>
          <p>
            Coordinates: {r.lat}, {r.lon}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;