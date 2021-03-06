const axios = require("axios")
const searchGeoLocation = async(address) => {
    const response = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZXN0aGVyNTUiLCJhIjoiY2t1OHEwNjEyMjUyeDJ2bzYxczdkY2ExNCJ9.RlOJc2bhzPDENVoL8W9soQ&limit=1&fuzzyMatch=false");
    
    if (response.data.features[0]) {
        longitude = response.data.features[0].center[0];
        latitude = response.data.features[0].center[1];
        return {longitude, latitude};
    }
    return {error: "Invalid location, try again!"};
    
}

module.exports = searchGeoLocation;