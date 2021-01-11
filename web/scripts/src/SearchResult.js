import {CurrentLocationContext} from './CurrentLocationManager.js';
import {CurrentLocationActions} from './CurrentLocationReducer.js';

function SearchResult({info, searchResultClickedHandler, ...remainingProps}){
    const [currentLocation, dispatch] = React.useContext(CurrentLocationContext);

    const handleMouseDown = (e) =>{ 
            let city = encodeURIComponent(e.target.dataset.city);
            let country = encodeURIComponent(e.target.dataset.country);
            dispatch({
                type: CurrentLocationActions.ADD_ITEM,
                payload:{
                    city: city,
                    country: country,
                    search:{
                        doSearch: true,
                        action: "searchByCity"
                    }
                }
            });
            searchResultClickedHandler();
        /*
            let response =  axios.get("http://localhost:8084/basement-finder/search",{
                    params: Object.assign(location,{
                         action: "searchByCity",
                            city: city,
                            country:country
                    })
                }).then(response => {
                   let data = response.data;
                   console.log(data);
                    if(typeof data == "object" && data != null && data.length > 0 ){
                        dispatch({type:CurrentLocationActions.ADD_ITEM, payload: data});

                    }  
                }).catch(res=>{
                    console.log("error: "+res);
                })*/
                
            
        }
    return (
           <div data-city={info.city} data-country={info.country} onMouseDown={handleMouseDown} className="search-results--result flex flex-row">
                <span className="material-icons search-result--result--icon">
                    room
                </span>
                {info.city}
            </div>
            )
}

export default React.memo(SearchResult);