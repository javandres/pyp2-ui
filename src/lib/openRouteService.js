class OpenRouteService {
    constructor() {
      this.items = [
      ];
    }
   
    async getIsochrones( lat, lon, profile="foot-walking", range=300 ) {
        var url = 'https://api.openrouteservice.org/v2/isochrones/'+profile;
        var data = {"locations":[[ lon, lat]],"range":[range],"range_type":"time"};
        return fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Content-Type': 'application/json',
            'Authorization': '5b3ce3597851110001cf6248e2fb3cafe4f94697b1ba0f7242fe5f0e'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => response);
    }
    
  }
  export default OpenRouteService;
  //5b3ce3597851110001cf6248e2fb3cafe4f94697b1ba0f7242fe5f0e  javandres.g
  //5b3ce3597851110001cf624845fc235b19a449fdbf1dfa2d209b94cc  jgarcia

