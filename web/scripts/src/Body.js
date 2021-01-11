import Map from './Map.js';
import SearchResultBasements from './SearchResultBasements.js';
import {CurrentLocationContext, initialState} from './CurrentLocationManager.js';
import {CurrentLocationActions} from './CurrentLocationReducer.js';
import {ENV} from './global.js';
import CurrentLocationModal from './CurrentLocationModal.js';

function Body({setInfoMsg}){
    const mapRef = React.useRef(null);
    const [currentLocation, dispatch] = React.useContext(CurrentLocationContext);
    const [basements, setBasements] = React.useState(null);
    const [modalState, setModalState] = React.useState({
        placeId: null,
        description: null,
        price: null,
        className: null,
        email: null
    })
     
    
    const displayModal = React.useCallback((placeId, description, price) =>{
        setModalState({
            placeId: placeId,
            description: description,
            price:price,
            className: "animation-modal"
        })
    }
            ,[])
    
    
    
    React.useEffect(()=>{
        if(currentLocation.search.doSearch){
            dispatch({
                        type :CurrentLocationActions.ADD_ITEM,
                        payload:{
                            search: {
                                doSearch: false,
                                action: null
                    }
                        }
                    });
        }
    },[currentLocation])
    
    React.useEffect(()=>{
                    if(mapRef.current == null){
                        mapRef.current = document.getElementById("actualMap");
                    }

        //document.getElementById("actualMap")!=null && (currentLocation.latitude != null && currentLocation.longitude != null
        if(currentLocation.search.doSearch && mapRef.current!==null){
            const curPos = {
                lat: currentLocation.latitude,
                lng: currentLocation.longitude
            }
           
            let newMarkers = [];
            let markers; 
            // Getting markers around current position
            axios.get(ENV.PATH+"search",{
                    params :{
                                ...currentLocation,
                    action: currentLocation.search.action,
                                }
                }).then(response=>{

                    markers = response.data;
                    console.log(response.data)
                    if(markers != null && markers.length != 0 ){
                       newMarkers = markers.map(marker=>{

                                let curMarker = new google.maps.Marker({
                                 position:{ 
                                    lat: parseFloat(marker.latitude),
                                    lng: parseFloat(marker.longitude)
                                    },
                                 animation: google.maps.Animation.DROP,
                                 label:{
                                     text:marker.price,
                                },
                                 icon: 'res/mapIcon.png'


                            });
                            curMarker.addListener("click",()=>{
                                displayModal(marker.placeId,marker.description, marker.price);
                            })
                            return curMarker;
                           });
                           
                           // If use uses current location, it will be set in currentLocation, if not get the location of first marker in search area
                           let mapCenter = curPos.lat != null && curPos.lng != null ? curPos : newMarkers[0].getPosition()
                           const map = new google.maps.Map(document.getElementById("actualMap"),{
                                zoom: 10,
                                center: mapCenter
                            });
                           
                        new MarkerClusterer(map, newMarkers, {
                                        imagePath:  "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                        });
                    }else{
                       setInfoMsg({
                        visibility: 'block',
                        infoMsg: "No basements found"
                            });
                        dispatch({
                            type: CurrentLocationActions.ADD_ITEM,
                            payload: {
                                search: {
                                    doSearch: false,
                                    action: null
                                },
                                latitude: null,
                                longitude: null,
                                placeId: null,
                                city : null
                            }
                        })
                    }
                        setBasements(markers)
                        
                        
                        }).catch(err=>{
                            console.log(err);
                            
                        });
                        // GETTING markers END



            
        }
    },[currentLocation.search])
    
    return (
            <div className="body grid">
                <CurrentLocationModal modalState={modalState} setModalState={setModalState}/>
                <Map ref={mapRef} placeId={currentLocation.placeId} latitude={currentLocation.latitude} longitude={currentLocation.longitude} doSearch={currentLocation.search.doSearch} city={currentLocation.city} />
                <SearchResultBasements basements={basements} displayModal={displayModal}/>
            </div>
            );
}

export default React.memo(Body);