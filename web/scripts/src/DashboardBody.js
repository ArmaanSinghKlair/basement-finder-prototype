import DashboardBasements from './DashboardBasements.js';
import DashboardProfile from './DashboardProfile.js';
import {UserInfoContext} from './UserInfoManager.js';
import {ENV} from './global.js';
import {UserInfoActions} from './UserInfoReducer.js';

function DashboardBody(props){
    const [userInfo, dispatch] = React.useContext(UserInfoContext);
    
    React.useLayoutEffect(()=>{
        if(userInfo != null && userInfo.refresh){
            console.log(userInfo);
        axios.get(ENV.PATH+"dashboard",{
            params:{
                action: "getUserInfo"
            }
        }).then(response =>{
            dispatch({
                type: UserInfoActions.ADD_EDIT_ITEM,
                payload: {...response.data, refresh: false},
            })
        })
    }
    },[userInfo])
    
    return(
            <div className="dashboard-body grid" style={{height: window.innerHeight*0.9}}>
                <DashboardBasements />
                <DashboardProfile />
            </div>
                    

            )
}

export default React.memo(DashboardBody);