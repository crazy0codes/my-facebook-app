export function setUserName(response, setUser) {
    console.log('Successful login for: ' + response.name);
    setUser(() => ({
        name: response.name,
        email: response.email || null,
    }));
}

export function setUserProfile(response, setUser) {
    const { url } = response.data;
    setUser((prev) => ({
        ...prev,
        url,
    }));
}



const fetchFacebookData = async (pageId, metric, accessToken) => {
    const response = await fetch(`https://graph.facebook.com/v17.0/${pageId}/insights/${metric}?access_token=${accessToken}`);
    const data = await response.json();
    console.log(`${metric}:`, data);
    const { data: [rawData] } = data;
    const { values: [firstArray] } = rawData;
    const { value } = firstArray;
    return value;
};

export const followers = (pageId, accessToken) => fetchFacebookData(pageId, 'page_follows', accessToken);
export const reactions = (pageId, accessToken) => fetchFacebookData(pageId, 'page_actions_post_reactions_total/days_28', accessToken);
export const impressions = (pageId, accessToken) => fetchFacebookData(pageId, 'page_impressions/days_28', accessToken);
export const engagement = (pageId, accessToken) => fetchFacebookData(pageId, 'page_post_engagements/days_28', accessToken);
