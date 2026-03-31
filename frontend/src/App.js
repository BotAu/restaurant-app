import React, { useEffect, useState } from 'react';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Restaurant Recommender</h1>

      <div>
        <strong>Test login:</strong><br />
        user: test@user.com<br />
        pass: 123456
      </div>

      <h2>Restaurants</h2>

      {restaurants.map(r => (
        <div key={r.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{r.name}</h3>
          <p>{r.cuisine}</p>
          <p>Rating: {r.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default App;