import SearchBar from './SearchBar.js';
import {CurrentLocationContext} from './CurrentLocationManager.js';
import {CurrentLocationActions} from './CurrentLocationReducer.js';

function SearchHeader(props){

    const[priceRangeVisibility, setPriceRangeVisibility] = React.useState(false);
    const [currentLocation, dispatch] = React.useContext(CurrentLocationContext);
    
    const handleIsSharing = () =>{
        dispatch({
            type: CurrentLocationActions.ADD_ITEM,
            payload:{
                isSharing: !currentLocation.isSharing
            }
        })
    }
    
    const handleRadiusChange = e =>{
        dispatch({
            type: CurrentLocationActions.ADD_ITEM,
            payload:{
                radius: e.target.value
            }
        })
    }
    
    const minPriceHandler = e =>{
        dispatch({
            type:CurrentLocationActions.ADD_ITEM,
            payload: {
                minPrice: e.target.value
            }
        })
    }
    const maxPriceHandler = e =>{
        dispatch({
            type:CurrentLocationActions.ADD_ITEM,
            payload: {
                maxPrice: e.target.value
            }
        })
    }
    
    return (
            <div className="search-header flex flex-row">
            
                <div className="filters flex flex-row" >
                    <div className="filters--filter price">
                    { 
                    ( currentLocation.minPrice ==null || currentLocation.maxPrice == null ) 
                    ? 
                    <span className="flex flex-row" onClick={()=>setPriceRangeVisibility(!priceRangeVisibility)}>Price Range <span className="material-icons">expand_more</span></span> 
                    : 
                    <span className="min-max" onClick={()=>setPriceRangeVisibility(!priceRangeVisibility)}>${currentLocation.minPrice} - ${currentLocation.maxPrice}</span> 
                    }
                    <div className="price-dialog flex flex-column" style={{display: priceRangeVisibility ? 'block':'none'}}>
                        <label htmlFor="min">
                            Minimum ${currentLocation.minPrice != null ? currentLocation.minPrice : 0}
                            <input type="range" min="0" max="5000" step="10"  id="min" name="minPrice" onChange={minPriceHandler}/>
                        </label>
                        <label htmlFor="max">
                            Maximum ${currentLocation.maxPrice != null ? currentLocation.maxPrice : 0}
                            <input type="range" min={currentLocation.minPrice!=null? currentLocation.minPrice : 0} max="5000" step="10" id="max" name="maxPrice" onChange={maxPriceHandler}/>
                        </label>
                        <button className="info-msg-close" onClick={()=>setPriceRangeVisibility(!priceRangeVisibility)}>Done</button>
                    </div>
                    </div>
                
                <div className="filters--filter checkbox">
                <span className="flex flex-row">Sharing 
                <input type="checkbox" name="sharing" onClick={handleIsSharing}/>
                </span>
                </div>
                <div className="filters--filter radius">
                <span className="flex flex-row">Search Radius 
                <select name="range" onChange={handleRadiusChange}>
                    {
                    Array(9).fill(null).map((v,i)=>{
                        return <option value={(i+1)*10} key={i}>{(i+1)*10} km</option>
                    })
                    }
                </select>
                </span>
                </div>
            </div>
            <SearchBar />
            
           
            </div>
            );
}

export default React.memo(SearchHeader);