var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import SearchBar from './SearchBar.js';
import { CurrentLocationContext } from './CurrentLocationManager.js';
import { CurrentLocationActions } from './CurrentLocationReducer.js';
import { ENV } from './global.js';

function Header(_ref) {
    var setInfoMsg = _ref.setInfoMsg;

    var _React$useContext = React.useContext(CurrentLocationContext),
        _React$useContext2 = _slicedToArray(_React$useContext, 2),
        currentLocation = _React$useContext2[0],
        dispatch = _React$useContext2[1];

    var aroundMeHandler = function aroundMeHandler(e) {
        navigator.geolocation.getCurrentPosition(function (geoPos) {
            dispatch({
                type: CurrentLocationActions.ADD_ITEM,
                payload: {
                    latitude: geoPos.coords.latitude,
                    longitude: geoPos.coords.longitude,
                    search: {
                        doSearch: true,
                        action: "searchByCoords"
                    }
                }
            });
        }, function (err) {
            setInfoMsg({
                visibility: 'block',
                infoMsg: "We need your permission to continue"
            });
        });
    };
    return React.createElement(
        'div',
        { className: 'header flex flex-row' },
        React.createElement(
            'div',
            { className: 'logo' },
            React.createElement(
                'span',
                { className: 'logo--base' },
                'BASE'
            ),
            React.createElement(
                'span',
                { className: 'logo--ments' },
                'MENTS'
            )
        ),
        React.createElement(
            'div',
            { className: 'flex flex-row header-not-logo' },
            React.createElement(
                'button',
                { className: 'locations-around-me flex flex-row', onClick: aroundMeHandler },
                React.createElement(
                    'span',
                    { className: 'material-icons search-result--result--icon' },
                    'room'
                ),
                'Near me'
            ),
            React.createElement(
                'button',
                { className: 'login flex flex-row', onClick: function onClick() {
                        return location.assign(ENV.PATH + "dashboard");
                    } },
                React.createElement(
                    'span',
                    { className: 'material-icons search-result--result--icon' },
                    'login'
                ),
                ' Dashboard'
            )
        )
    );
}

export default React.memo(Header);