const API_URL = process.env.REACT_APP_API_URL;

class Pyp2Service {
    constructor() {
     
    }
   
    async getHexGrid() {
        console.log("IN HEXGRID")
        console.log(API_URL)
        
        var url = API_URL+'/api/v1/pyp2/hexgrid/';
        return fetch(url).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => response);
    }

    async getIsochrones( lat, lon, profile="pedestrian", range=5 ) {
        var url = API_URL+'/api/v1/pyp2/isochrone_otp/';
        var data = {"locations":[{ "lat":lat, "lon":lon}],"contours":[{"time":range}],"costing":profile};
        return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => response);
    }


  }
  export default Pyp2Service;
