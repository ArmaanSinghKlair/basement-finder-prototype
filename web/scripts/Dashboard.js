import LoginHeader from './LoginHeader.js';
import DashboardBody from './DashboardBody.js';
import UserInfoManager, { initialState } from './UserInfoManager.js';
import UserInfoReducer from './UserInfoReducer.js';

function Dashboard() {

    return React.createElement(
        UserInfoManager,
        { reducer: UserInfoReducer, initialState: initialState },
        React.createElement(
            'div',
            { className: 'main-login-container grid' },
            React.createElement(LoginHeader, null),
            React.createElement(DashboardBody, null)
        )
    );
}
ReactDOM.render(React.createElement(Dashboard, null), document.getElementById("container"));