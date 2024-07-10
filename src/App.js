// src/App.js
import React from 'react';
import FacebookLogin from './pages/FacebookLogin';
import FacebookInsightsDashboard from './pages/Dashboard';


function App() {
  const [user, setUser] = React.useState({
    name: null,
    picture: {
      data: {
        url: null,
      },
    },
  });
  const [error, setError] = React.useState(null);
  // const [pages, setPages] = React.useState([]);
  // const [insights, setInsights] = React.useState({});
  // const [loading, setLoading] = React.useState(false);

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {user.name ?
        <FacebookInsightsDashboard />
        : <FacebookLogin
          props={{
            setUser,
            setPages,
            setInsights,
            setError,
            setLoading
          }}
         />}
    </div>
  );
}

export default App;
