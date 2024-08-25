export function setUserName(response, setUser) {
  setUser(() => ({
    name: response.name,
    email: response.email || null,
    userId : response.id,
    imgUrl : response.picture.data.url || null
  }));
}

const fetchFacebookData = async (pageId, metric, accessToken, startTime, endTime) => {
  try {
    let API = `https://graph.facebook.com/v20.0/${pageId}/insights?access_token=${accessToken}&pretty=0&since=${startTime}&until=${endTime}&metric=${metric}`;
    const apiRequest = await fetch(API);
    const apiResponse = await apiRequest.json();
    console.log(apiResponse)
    const {data} = apiResponse;
    console.log(data)

    switch(metric){
      case "page_follows" :
      case "page_impressions&period=days_28" :
      case "page_post_engagements&period=days_28" :
        return (data[0].values.pop()).value;
      break;

      case "page_actions_post_reactions_total&period=days_28" :
        let count = 0;
        let reactions = (data[0].values.pop()).value;
        if(reactions.length != 0){
          Object.values(reactions).map(reaction => {
            count += reaction;
            return;
          })
        }
        return count;
      break;


      default : return 0;
    }

  } catch (error) {
    console.error('Error fetching Facebook data:', error);
    return 0;
  }
};




export const followers = (pageId, accessToken, startTime,endTime) => fetchFacebookData(pageId, 'page_follows', accessToken, startTime, endTime);
export const reactions = (pageId, accessToken, startTime,endTime) => fetchFacebookData(pageId, 'page_actions_post_reactions_total&period=days_28', accessToken, startTime, endTime);
export const impressions = (pageId, accessToken, startTime,endTime) => fetchFacebookData(pageId, 'page_impressions&period=days_28', accessToken, startTime, endTime);
export const engagement = (pageId, accessToken, startTime,endTime) => fetchFacebookData(pageId, 'page_post_engagements&period=days_28', accessToken, startTime, endTime);