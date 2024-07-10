import React, { useEffect } from 'react';
import { Button } from "../components/ui/button";

const FacebookLogin = ({setUser, setPages, setInsigths, setError}) => {
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
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      fetchUserProfile();
    } else {
      setError(response.status);
    }
  };

  const handleFBLogin = () => {
    const loginUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=some_string&config_id=${configId}`;
    window.location.href = loginUrl;
  };

  const fetchUserProfile = () => {
    console.log('Fetching user profile');
    window.FB.api('/me', { fields: 'name,email' }, function (response) {
      console.log('Successful login for: ' + response.name);
      setUser({
        name: response.name,
        email: response.email,
      });
    });
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