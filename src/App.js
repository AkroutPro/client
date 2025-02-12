import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users when the component mounts
  useEffect(() => {
    // Fetch users from the back end
    fetch('http://localhost:3001/api/users')
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        setUsers(data); // Update state with users
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        setError(err); // Handle errors
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array, so it runs once when the component mounts

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li> // Adjust based on your user model
        ))}
      </ul>
    </div>
  );
};

export default App;
