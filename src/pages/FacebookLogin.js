import React, { useEffect } from 'react';
import { Button } from "../components/ui/button";
import { setUserName } from '../api/api';


const FacebookLogin = ({ props }) => {
  const { setUser, setPages} = props;
  const configId = process.env.REACT_APP_CONFIG_ID;
  const appId = process.env.REACT_APP_APP_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v17.0'
      });

      window.FB.AppEvents.logPageView();

      window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, [appId]);

  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      setUser( prev => ({
        ...prev,
        accessToken: response.authResponse.accessToken
      }));
      fetchUserProfile();
      localStorage.setItem('accessToken', response.authResponse.accessToken);
    } else {
      console.log(response)
    }
  };

  const handleFBLogin = () => {
    const loginUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=some_string&config_id=${configId}`;
    window.location.href = loginUrl;
  };

  const fetchUserProfile = () => {
    try {
      console.log('Fetching user profile...');
      window.FB.api('/me', { fields: 'name,email,id,picture' }, (response) =>  setUserName(response, setUser));
      window.FB.api('/me/accounts', {}, (response) => {
        setPages(() => response.data);
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Button
        onClick={handleFBLogin}
        className="bg-black text-white hover:bg-gray-800 transition-colors"
      >
        Login with Facebook
      </Button>
    </div>
  );
};

export default FacebookLogin;