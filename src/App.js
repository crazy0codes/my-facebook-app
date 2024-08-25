import React from 'react';
import { useState } from 'react';
import FacebookLogin from './pages/FacebookLogin';
import FacebookInsightsDashboard from './pages/Dashboard';


function App() {
  const [user, setUser] = React.useState({});
  const [pages, setPages] = useState([]);

  return (
    <div className="App">
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
            setPages
          }}
         />}
    </div>
  );
}

export default App;
