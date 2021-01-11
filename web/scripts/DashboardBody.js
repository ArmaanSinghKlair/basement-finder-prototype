var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import DashboardBasements from './DashboardBasements.js';
import DashboardProfile from './DashboardProfile.js';
import { UserInfoContext } from './UserInfoManager.js';
import { ENV } from './global.js';
import { UserInfoActions } from './UserInfoReducer.js';

function DashboardBody(props) {
    var _React$useContext = React.useContext(UserInfoContext),
        _React$useContext2 = _slicedToArray(_React$useContext, 2),
        userInfo = _React$useContext2[0],
        dispatch = _React$useContext2[1];

    React.useLayoutEffect(function () {
        if (userInfo != null && userInfo.refresh) {
            console.log(userInfo);
            axios.get(ENV.PATH + "dashboard", {
                params: {
                    action: "getUserInfo"
                }
            }).then(function (response) {
                dispatch({
                    type: UserInfoActions.ADD_EDIT_ITEM,
                    payload: Object.assign({}, response.data, { refresh: false })
                });
            });
        }
    }, [userInfo]);

    return React.createElement(
        'div',
        { className: 'dashboard-body grid', style: { height: window.innerHeight * 0.9 } },
        React.createElement(DashboardBasements, null),
        React.createElement(DashboardProfile, null)
    );
}

export default React.memo(DashboardBody);