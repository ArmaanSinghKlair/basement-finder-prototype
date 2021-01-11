import {ENV} from './global.js';

function DashboardBasement({basement, displayModal}){
    const [imageCode, setImageCode] = React.useState(null);
    
    React.useEffect(()=>{
            axios.get(ENV.PATH+"dashboard",{
                params:{
                    action:"getSingleImageByPlaceId",
                    placeId: basement.placeId
                }
            }).then(response => {
                if(response.data.searchResult){
                    setImageCode(response.data.code)
                } 
            })
    
    },[])
    
    return (
            <div className="dashboard-basement flex flex-column" data-placeid={basement.placeId} data-description={basement.description} data-price={basement.price} onClick={displayModal}>
            { imageCode == null ?
            <span className="material-icons" style={{padding:"100px"}}>apartment</span>
                :
            <img src={imageCode} className="basement-image" alt="basement image"/>
            }
            
            <div className="dashboard-basement--info flex flex-column">
                <span className="info--main-info">
                    {basement.city}, {basement.state}, {basement.country}
                </span>
                <span className="info--sub-info">
                    <b>${basement.price}</b>
                </span>
                <span className="info--sub-sub-info">
                <b>({basement.sharing ? "Shared":"Not shared"})</b>
                </span>
            </div>
              
            </div>
            )
}

export default React.memo(DashboardBasement);