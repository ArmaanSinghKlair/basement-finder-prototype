var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { getBasementInfo } from './getBasementDetails.js';
//import {CurrentLocationContext} from './CurrentLocationManager.js';
//import {CurrentLocationActions} from './CurrentLocationReducer.js';

function SearchResultBasement(_ref) {
    var placeId = _ref.placeId,
        price = _ref.price;

    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        address = _React$useState2[0],
        setAddress = _React$useState2[1];
    // const [currentLocation, dispatch] = React.useContext(CurrentLocationContext);

    React.useEffect(function () {
        getBasementInfo(setAddress, placeId);
    }, [address]);

    return React.createElement(
        "div",
        { className: "search-result-basement flex flex-row" },
        React.createElement(
            "div",
            { className: "search-result-basement-icon" },
            React.createElement(
                "span",
                { className: "material-icons search-result--result--icon" },
                "room"
            )
        ),
        React.createElement(
            "div",
            { className: "search-result-basement-address" },
            React.createElement(
                "div",
                { className: "search-result-basement-price" },
                "$",
                price
            ),
            address
        )
    );
}

export default React.memo(SearchResultBasement);

/*
 * 
 * 
 *  onload="getBasementAddress(this,placeId)"
 */