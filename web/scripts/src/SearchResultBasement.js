import {getBasementInfo} from './getBasementDetails.js';
//import {CurrentLocationContext} from './CurrentLocationManager.js';
//import {CurrentLocationActions} from './CurrentLocationReducer.js';

function SearchResultBasement({placeId, price}){
    const [address,setAddress] = React.useState(null);
   // const [currentLocation, dispatch] = React.useContext(CurrentLocationContext);

    React.useEffect(()=>{
        getBasementInfo(setAddress, placeId);
    },[address])
    
    return(
            <div className="search-result-basement flex flex-row">
                <div className="search-result-basement-icon" ><span className="material-icons search-result--result--icon">room</span></div>
                <div className="search-result-basement-address"><div className="search-result-basement-price">${price}</div>
                        {address}
                                </div>
            </div> 
            )
}

export default React.memo(SearchResultBasement);
    
    /*
     * 
     * 
     *  onload="getBasementAddress(this,placeId)"
     */