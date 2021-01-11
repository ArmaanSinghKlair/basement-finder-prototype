import {ENV} from './global.js';
import {getBasementInfo} from './getBasementDetails.js';
import {UserInfoContext} from './UserInfoManager.js';
import SlideShowContainer from './SlideShowContainer.js';

function DashboardBasementModal({modalState, setModalState, displayModal}){
    const uploadImagesRef = React.useRef(null);
    const [images, setImages] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [userInfo, dispatch] = React.useContext(UserInfoContext);
    const [deletionStatus, setDeletionStatus] = React.useState(null);
    
    React.useEffect(()=>{
        if(userInfo.basements != null && userInfo.basements.length > 0 && modalState.placeId != null){
            axios.get(ENV.PATH+"dashboard",{
                params:{
                    action:"getImagesByPlaceId",
                    placeId: modalState.placeId
                }
            }).then(response => {
                console.log(response);
                if(response.data.searchResult == null)
                    setImages(response.data);
            })
    }
    },[modalState.placeId])
    
    React.useLayoutEffect(()=>{
        if(modalState.placeId != null)
            getBasementInfo(setAddress, modalState.placeId);
    },[modalState.placeId])
    
    const removeBasement =(e)=>{
        axios({
                url: ENV.PATH+"dashboard",
                method: "post",
                data:{
                    action:"dlBs",
                    placeId: e.target.dataset.placeid
                }
        }).then(response=>{
            if(!response.data.deletionSuccessfull)
                setDeletionStatus(response.data.errMsg);
            else
                location.reload();
        })
    }
    
    const uploadImages =(e)=>{
        let files = uploadImagesRef.current.files;
        let data = new FormData();
        let file;
        if(files.length == 0){
            setDeletionStatus("At least one image needed")
            return;
        }
        if(files.length > 7){
            setDeletionStatus("At most 7 images allowed");
            return;
        }
        
        Object.values(files).forEach((file,index)=>{
            data.append(index,file,file.name);
        })
       
        axios({
            method: "post",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            url: ENV.PATH+"dashboard",
            params:{
                action: "uploadBasementImages",
                placeId: modalState.placeId
            }
            
        }).then(response=>{
           if(response.data.imageUpdationSuccessfull)
                    location.reload()
                else
                    setDeletionStatus(response.data.errMsg)
        });
    }
    return (
            <div className={`dashboard-basement-modal modal flex flex-column ${modalState.className}`} style={{position: "fixed"}}>
            <div className="dashboard-basement-modal-close" onClick={()=>setModalState(state=>{return {...state, className: null}} )}>
            <span className="material-icons">disabled_by_default</span>
            </div>
            
            <div className="dashboard-basement-modal-images">
            {images == null ||images.length == 0 ?
            <div className="dashboard-basement-modal-no-images flex flex-column">
            <div><span className="material-icons">insert_photo</span>No images uploaded</div>
            <div className="upload-images">
            <label htmlFor="uploadImages">
                Choose Files
                <input type="file" id="uploadImages" multiple ref={uploadImagesRef}/>
            </label>
            <button id="uploadImages" onClick={uploadImages}>Upload</button>
            </div>
                
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
                    <span className="error">{deletionStatus}</span>
            </div>
            
                        <div className="dashboard-basement-cta">
                        <button data-placeid={modalState.placeId} onClick={removeBasement}>Remove listing</button>
                        </div>
            </div>
            )
}

export default DashboardBasementModal;