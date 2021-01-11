import {UserInfoContext} from './UserInfoManager.js';
import DashboardFunctionality from './DashboardFunctionality.js';
import AddBasements from './AddBasements.js';
import {ENV} from './global.js';

function DashboardProfile(props){
        const [userInfo, dispatch] = React.useContext(UserInfoContext);
        const [modalState, setModalState] = React.useState({
            className: '',
            currentComponent: null
        })
       
    return (
            <div>
            <DashboardFunctionality modalState={modalState} setModalState={setModalState} />
            <div className="dashboard-profile flex flex-column">
            
            <div className="user-info flex flex-row">
                {(userInfo == null || userInfo.base64Image == null || userInfo.base64Image.trim() == "null")
                ?
                    <span className="material-icons">account_circle</span>
                :
                    <img src={userInfo.base64Image}/>
                }
                {userInfo != null && userInfo.username != null ? userInfo.username : <h1>Not Logged In</h1>}
            </div>
            <div className="dashboard-profile--edit-profile dashboard-profile--options flex flex-row">
                <span className="material-icons">settings</span> Edit Profile
            </div>
            <div className="dashboard-profile--add-basement dashboard-profile--options flex flex-row" onClick={()=>{setModalState({className:'animation-fade-modal', currentComponent: AddBasements})}}>
                <span className="material-icons">add_location_alt</span> Add Basement
            </div>
            <div className="dashboard-profile--options-separator"></div>
            <div className="dashboard-profile--options logout flex flex-row" onClick={()=>location.assign(ENV.PATH+"login?action=logout")}><span className="material-icons">login</span> Logout</div>
            </div>
            </div>
            )
}

export default React.memo(DashboardProfile);