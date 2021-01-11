import {UserInfoContext} from './UserInfoManager.js';
import DashboardBasement from './DashboardBasement.js'
import {ENV} from './global.js';
import DashboardBasementModal from './DashboardBasementModal.js';

function DashboardBasements(props){
    const [userInfo, dispatch] = React.useContext(UserInfoContext);
    const [modalState, setModalState] = React.useState({
        placeId: null,
        description: null,
        price: null,
        display: null
    })
     
    
    const displayModal = (e) =>{
        setModalState({
            placeId: e.currentTarget.getAttribute("data-placeid"),
            description: e.currentTarget.getAttribute("data-description"),
            price:e.currentTarget.getAttribute("data-price"),
            className: "animation-modal"
        })
    }
    
    /*
     * 
           
     */
    return (<div className="dashboard-basements"> 
            <DashboardBasementModal modalState={modalState} setModalState={setModalState}/>
            <div className="dashboard-basements-header flex flex-row">
                <h4>Your basements</h4>
                <div className="paginator">{userInfo != null && userInfo.basements != null ? (userInfo.basements.length > 1 ? <span>{userInfo.basements.length} basements</span> : <span>{userInfo.basements.length} basement</span>) : 0} </div>
            </div>
            
            <div className="dashboard-basements-basements flex flex-row">
            { (userInfo == null || userInfo.basements == null || userInfo.basements.length == 0) ?
            <div className="dashboard-basements--no-basements center"><span className="material-icons">location_off</span> No basements yet</div>
            :
                userInfo.basements.map((basement,i)=> <DashboardBasement key={i} basement={basement} displayModal={displayModal}/>)
            }
            </div>
            </div>
            )
}

export default React.memo(DashboardBasements);