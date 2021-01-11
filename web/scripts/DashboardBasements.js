var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { UserInfoContext } from './UserInfoManager.js';
import DashboardBasement from './DashboardBasement.js';
import { ENV } from './global.js';
import DashboardBasementModal from './DashboardBasementModal.js';

function DashboardBasements(props) {
    var _React$useContext = React.useContext(UserInfoContext),
        _React$useContext2 = _slicedToArray(_React$useContext, 2),
        userInfo = _React$useContext2[0],
        dispatch = _React$useContext2[1];

    var _React$useState = React.useState({
        placeId: null,
        description: null,
        price: null,
        display: null
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        modalState = _React$useState2[0],
        setModalState = _React$useState2[1];

    var displayModal = function displayModal(e) {
        setModalState({
            placeId: e.currentTarget.getAttribute("data-placeid"),
            description: e.currentTarget.getAttribute("data-description"),
            price: e.currentTarget.getAttribute("data-price"),
            className: "animation-modal"
        });
    };

    /*
     * 
           
     */
    return React.createElement(
        'div',
        { className: 'dashboard-basements' },
        React.createElement(DashboardBasementModal, { modalState: modalState, setModalState: setModalState }),
        React.createElement(
            'div',
            { className: 'dashboard-basements-header flex flex-row' },
            React.createElement(
                'h4',
                null,
                'Your basements'
            ),
            React.createElement(
                'div',
                { className: 'paginator' },
                userInfo != null && userInfo.basements != null ? userInfo.basements.length > 1 ? React.createElement(
                    'span',
                    null,
                    userInfo.basements.length,
                    ' basements'
                ) : React.createElement(
                    'span',
                    null,
                    userInfo.basements.length,
                    ' basement'
                ) : 0,
                ' '
            )
        ),
        React.createElement(
            'div',
            { className: 'dashboard-basements-basements flex flex-row' },
            userInfo == null || userInfo.basements == null || userInfo.basements.length == 0 ? React.createElement(
                'div',
                { className: 'dashboard-basements--no-basements center' },
                React.createElement(
                    'span',
                    { className: 'material-icons' },
                    'location_off'
                ),
                ' No basements yet'
            ) : userInfo.basements.map(function (basement, i) {
                return React.createElement(DashboardBasement, { key: i, basement: basement, displayModal: displayModal });
            })
        )
    );
}

export default React.memo(DashboardBasements);