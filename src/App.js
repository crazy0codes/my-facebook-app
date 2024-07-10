// src/App.js
import React from 'react';
import { useState } from 'react';
import FacebookLogin from './pages/FacebookLogin';
import FacebookInsightsDashboard from './pages/Dashboard';


function App() {
  const [user, setUser] = React.useState({});
  const [error, setError] = React.useState(null);
  const [pages, setPages] = useState([]);
  // const [insights, setInsights] = React.useState({});
  // const [loading, setLoading] = React.useState(false);

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {user.name ?
        <FacebookInsightsDashboard
         props={{
            user,
            pages
         }}
         />
        : <FacebookLogin
          props={{
            setUser,
            setError,
            setPages
          }}
         />}
    </div>
  );
}

export default App;
