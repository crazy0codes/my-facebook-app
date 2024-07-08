import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FacebookLogin from 'react-facebook-login';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed:", error);
  };

  function responseFacebook(response) {
    console.log(response);
    setUser(response);
  }

  const buttonStyle = {
    backgroundColor: '#1877F2',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <img src={logo} style={{ width: '100px', height: '100px', marginBottom: '20px' }} alt="logo" />
      
      {!user ? (
        <FacebookLogin
          appId='861819599331369' // Replace with your actual Facebook App ID
          autoLoad={false}
          fields="name,picture"
          scope="public_profile"
          callback={responseFacebook}
          onFailure={handleLoginFailure}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} style={buttonStyle}>
              Login with Facebook
            </button>
          )}
        />
      ) : (
        <div style={cardStyle}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Welcome, {user.name}!</h2>
          <img 
            src={user.picture.data.url} 
            alt={user.name} 
            style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '15px' }}
          />
          {user.email && <p style={{ color: '#65676B', marginBottom: '15px' }}>{user.email}</p>}
          <button 
            onClick={handleLogout}
            style={{...buttonStyle, backgroundColor: '#ED4956'}}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
