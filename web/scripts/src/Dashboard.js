import LoginHeader from './LoginHeader.js';
import DashboardBody from './DashboardBody.js';
import UserInfoManager, {initialState} from './UserInfoManager.js';
import UserInfoReducer from './UserInfoReducer.js';

function Dashboard(){
    
    return (
            <UserInfoManager reducer={UserInfoReducer} initialState={initialState}>
                <div className="main-login-container grid">
                    <LoginHeader />
                    <DashboardBody />
                </div>
            </UserInfoManager>
              );
}
ReactDOM.render(<Dashboard/>,document.getElementById("container"));
             