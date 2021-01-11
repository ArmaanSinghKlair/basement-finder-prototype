import MapAlt from './MapAlt.js';

const Map= React.forwardRef(({placeId, latitude, longitude, doSearch, city}, mapRef)=>{  
         
    return (
            <div className="map">
            {(placeId != null || (latitude != null && longitude != null) || doSearch || city != null) ? 
            <div className="actual-map" id="actualMap" ref={mapRef}></div>
    :
            <MapAlt />
    }
            </div>
            );
})

export default React.memo(Map);
    
