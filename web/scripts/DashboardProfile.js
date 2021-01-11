var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { UserInfoContext } from './UserInfoManager.js';
import DashboardFunctionality from './DashboardFunctionality.js';
import AddBasements from './AddBasements.js';
import { ENV } from './global.js';

function DashboardProfile(props) {
    var _React$useContext = React.useContext(UserInfoContext),
        _React$useContext2 = _slicedToArray(_React$useContext, 2),
        userInfo = _React$useContext2[0],
        dispatch = _React$useContext2[1];

    var _React$useState = React.useState({
        className: '',
        currentComponent: null
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        modalState = _React$useState2[0],
        setModalState = _React$useState2[1];

    return React.createElement(
        'div',
        null,
        React.createElement(DashboardFunctionality, { modalState: modalState, setModalState: setModalState }),
        React.createElement(
            'div',
            { className: 'dashboard-profile flex flex-column' },
            React.createElement(
                'div',
                { className: 'user-info flex flex-row' },
                userInfo == null || userInfo.base64Image == null || userInfo.base64Image.trim() == "null" ? React.createElement(
                    'span',
                    { className: 'material-icons' },
                    'account_circle'
                ) : React.createElement('img', { src: userInfo.base64Image }),
                userInfo != null && userInfo.username != null ? userInfo.username : React.createElement(
                    'h1',
                    null,
                    'Not Logged In'
                )
            ),
            React.createElement(
                'div',
                { className: 'dashboard-profile--edit-profile dashboard-profile--options flex flex-row' },
                React.createElement(
                    'span',
                    { className: 'material-icons' },
                    'settings'
                ),
                ' Edit Profile'
            ),
            React.createElement(
                'div',
                { className: 'dashboard-profile--add-basement dashboard-profile--options flex flex-row', onClick: function onClick() {
                        setModalState({ className: 'animation-fade-modal', currentComponent: AddBasements });
                    } },
                React.createElement(
                    'span',
                    { className: 'material-icons' },
                    'add_location_alt'
                ),
                ' Add Basement'
            ),
            React.createElement('div', { className: 'dashboard-profile--options-separator' }),
            React.createElement(
                'div',
                { className: 'dashboard-profile--options logout flex flex-row', onClick: function onClick() {
                        return location.assign(ENV.PATH + "login?action=logout");
                    } },
                React.createElement(
                    'span',
                    { className: 'material-icons' },
                    'login'
                ),
                ' Logout'
            )
        )
    );
}

export default React.memo(DashboardProfile);