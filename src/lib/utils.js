//import intersect from '@turf/intersect'
import * as turf from '@turf/turf'
class Utils {
    constructor() {
    }

    intersecHexagonsByIsochrone(hexagonsFeatures, isochrone, minPctArea=0.50 ){
        var isochronePolygon = turf.polygon([isochrone[0]["contours"]]);
        let features =[]
        hexagonsFeatures.map(function(feature) {
            let f = { type:"feature"};
            f.properties = {... feature.properties}
            f.geometry = {... feature.geometry}
            let hexagonPolygon = turf.polygon(feature.geometry.coordinates[0])
            let intersection = null
            try{
                intersection = turf.intersect(isochronePolygon, hexagonPolygon);
            }catch(e){
                console.log(e)
            }    
             if(intersection && (turf.area(intersection.geometry) / turf.area(hexagonPolygon) > minPctArea ) )
                f.properties["inIsochrone"]=true;
             else
                f.properties["inIsochrone"]=false;   
            features.push(f)    
         })
        return features
    }
}   
export default Utils;