import {ENV} from './global.js';
import {getBasementInfo} from './getBasementDetails.js';
import SlideShowContainer from './SlideShowContainer.js';

function CurrentLocationModal({modalState, setModalState}){
    const [images, setImages] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState({
        firstName: "User",
        lastName: "not found",
        email: "Not found"
    })
    React.useEffect(()=>{
        if(modalState.placeId != null){
            axios.get(ENV.PATH+"search",{
                params:{
                    action:"getImagesByPlaceId",
                    placeId: modalState.placeId
                }
            }).then(response => {
                if(response.data.searchResult == null)
                    setImages(response.data);
                else
                    setImages(null);
            })
            axios.get(ENV.PATH+"search",{
                params:{
                    action:"getUserByPlaceId",
                    placeId: modalState.placeId
                }
            }).then(response => {
                console.log(response);
                if(response.data.userFound)
                    setUserInfo({
                        email: response.data.email,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName
                    });
            });
    }
    },[modalState.placeId]);
    
    React.useLayoutEffect(()=>{
        if(modalState.placeId != null)
            getBasementInfo(setAddress, modalState.placeId);
    },[modalState.placeId]);
    
    
    return (
            <div style={{position:"fixed", left:0,top:0, width:window.innerWidth,height:window.innerHeight, zIndex:5, transform: modalState.className==null? "scale(0)":"scale(1)"}}>
            <div className={`current-location-modal--overlay overlay`}></div>
                <div className={`current-location-modal modal flex flex-column ${modalState.className}`} >
                <div className="dashboard-basement-modal-close" onClick={()=>setModalState(state=>{return {...state, className: null}} )}>
                <span className="material-icons">disabled_by_default</span>
                </div>

                <div className="dashboard-basement-modal-images">
                {images == null || images.length == 0 || images.length == null ?
                <div className="dashboard-basement-modal-no-images flex flex-column">
                    <div><span className="material-icons">insert_photo</span>No images uploaded</div>                
                </div>
                :
                   <SlideShowContainer images={images}/>
                }
                </div>

                <div className="dashboard-basement-details">
                <div className="address"><b>Address:</b> {address}</div>
                <div className="description"><b>Description:</b> {unescape(modalState.description)}</div>
                <div className="place-id" title={modalState.placeId}><b>Place ID:</b> {modalState.placeId}</div>
                        <div className="price"><b>Monthly Rent:</b> ${modalState.price}</div>
                </div>
                <div className="contact"><b>Listed By:</b> {userInfo.firstName} {userInfo.lastName} | <b> Email</b>: {userInfo.email}</div>


                </div>
            </div>
            )
}

export default React.memo(CurrentLocationModal);