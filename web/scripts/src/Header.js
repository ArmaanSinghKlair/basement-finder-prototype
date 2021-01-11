import SearchBar from './SearchBar.js';
import {CurrentLocationContext} from './CurrentLocationManager.js';
import {CurrentLocationActions} from './CurrentLocationReducer.js';
import {ENV} from './global.js';

function Header({setInfoMsg}){
    const [currentLocation, dispatch] = React.useContext(CurrentLocationContext);
    
    const aroundMeHandler = e =>{
        navigator.geolocation.getCurrentPosition((geoPos)=>{
            dispatch({
                type:CurrentLocationActions.ADD_ITEM,
                payload: {
                    latitude: geoPos.coords.latitude,
                    longitude: geoPos.coords.longitude,
                    search: {
                        doSearch: true,
                        action: "searchByCoords"
                    }
                }
            });
        },(err)=>{
            setInfoMsg({
                visibility: 'block',
                infoMsg: "We need your permission to continue"
            });
        });
    };
    return (
            <div className="header flex flex-row">
            
            <div className="logo">
            <span className="logo--base">BASE</span>
            <span className="logo--ments">MENTS</span>
            </div>
            
            <div className="flex flex-row header-not-logo" >
                <button className="locations-around-me flex flex-row" onClick={aroundMeHandler}>
                <span className="material-icons search-result--result--icon">room</span>
                Near me
                </button>

                 
                 <button className="login flex flex-row" onClick={()=>location.assign(ENV.PATH+"dashboard")}><span className="material-icons search-result--result--icon">login</span> Dashboard</button>
                
            </div>
            </div>
            );
}

export default React.memo(Header);