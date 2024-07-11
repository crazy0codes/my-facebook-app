export function setUserName(response, setUser) {
    console.log('Successful login for: ' + response.name);
    setUser(() => ({
        name: response.name,
        email: response.email || null,
    }));
}

export function setUserProfile(response, setUser) {
    const url = response.data.url;
    setUser((prev) => ({
        ...prev,
        url,
    }));
}


const fetchFacebookData = async (pageId, metric, accessToken) => {
    try {
      const response = await fetch(`https://graph.facebook.com/v17.0/${pageId}/insights/${metric}?access_token=${accessToken}`);
      const obj = await response.json();
      console.log('fetchFacebookData:', obj);
  
      // Check if the value is an object
      const value = obj.data[0].values[0].value;
      if (typeof value === 'object' && value !== null) {
        return 0;
      } else {
        let sum = 0;
        Object.keys(value).forEach((key) => {
          sum += value[key];
        });
        return sum;
      }
    } catch (error) {
      console.error('Error fetching Facebook data:', error);
      return 0;
    }
  };
  

export const followers = (pageId, accessToken) => fetchFacebookData(pageId, 'page_follows', accessToken);
export const reactions = (pageId, accessToken) => fetchFacebookData(pageId, 'page_actions_post_reactions_total/days_28', accessToken);
export const impressions = (pageId, accessToken) => fetchFacebookData(pageId, 'page_impressions/days_28', accessToken);
export const engagement = (pageId, accessToken) => fetchFacebookData(pageId, 'page_post_engagements/days_28', accessToken);