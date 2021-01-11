import SearchResult from './SearchResult.js';
import SearchBarActions, {SearchBarReducer} from './SearchBarReducer.js';
import {CurrentLocationContext} from './CurrentLocationManager.js';
import {CurrentLocationActions} from './CurrentLocationReducer.js';

function SearchBar(){
        const [searchResultState, dispatch] = React.useReducer(SearchBarReducer, {
            visibility: 'none',
            data:null
        });
        const [currentLocation, setCurrentLocation] = React.useContext(CurrentLocationContext);
        const searchBar = React.useRef(null);
        React.useEffect(()=>{
            searchBar.current.focus();
        },[])
        
        const handleSearchQuery =  (e) =>{                    
            if(searchBar.current.value.trim().length > 0){
                let query = encodeURIComponent(searchBar.current.value);
                let response =  axios.get("http://localhost:8084/basement-finder/search",{
                    params: {
                         action: "searchByQuery",
                            query: query,
                            min: ( currentLocation.minPrice !=null && currentLocation.maxPrice != null && currentLocation.maxPrice > currentLocation.minPrice) ? currentLocation.minPrice : null ,
                            max: ( currentLocation.minPrice !=null && currentLocation.maxPrice != null && currentLocation.maxPrice > currentLocation.minPrice) ? currentLocation.maxPrice : null ,
                    }
                }).then(response => {
                   let data = response.data;
                    if(typeof data == "object" && data != null && data.length > 0 ){
                        dispatch({type:SearchBarActions.NEWDATA, payload: data});

                    }  else{
                        dispatch({type:SearchBarActions.HIDE, payload: null});
                    }
                }).catch(res=>{
                    console.log("error: "+res);
                })
                
            } else{
                    dispatch({type:SearchBarActions.HIDE, payload: null});
            }
        }
        
        const searchBarFocusInHandler = e =>{
            e.target.parentNode.classList.add("search-bar-selected");
        }
        const searchBarFocusOutHandler = e =>{
            e.target.parentNode.classList.remove("search-bar-selected");
            dispatch({type:SearchBarActions.HIDE});  
            
        }
        const searchResultClickedHandler = () =>{
            dispatch({type:SearchBarActions.HIDE});  
        }
    return (
            <div className="search-bar flex flex-row">
                
    <input type="text" autoComplete="off" placeholder="Search Basements..." name="query" onKeyUp={handleSearchQuery} ref={searchBar} onFocus={searchBarFocusInHandler} onBlur={searchBarFocusOutHandler}/>
    <span className="material-icons" onClick={handleSearchQuery} style={{cursor:"pointer"}}>
    search
    </span>
                <div className="search-results" style={{display: searchResultState.visibility}}>

                    {searchResultState.data != null ? 
                    searchResultState.data.map((data,i)=> (<SearchResult info={data} key={i} searchResultClickedHandler={searchResultClickedHandler} />))
                        :
                       null }
                                    
                </div>
            </div>
            )
}
export default React.memo(SearchBar);