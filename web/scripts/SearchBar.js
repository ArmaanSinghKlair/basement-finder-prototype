var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import SearchResult from './SearchResult.js';
import SearchBarActions, { SearchBarReducer } from './SearchBarReducer.js';
import { CurrentLocationContext } from './CurrentLocationManager.js';
import { CurrentLocationActions } from './CurrentLocationReducer.js';

function SearchBar() {
    var _React$useReducer = React.useReducer(SearchBarReducer, {
        visibility: 'none',
        data: null
    }),
        _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
        searchResultState = _React$useReducer2[0],
        dispatch = _React$useReducer2[1];

    var _React$useContext = React.useContext(CurrentLocationContext),
        _React$useContext2 = _slicedToArray(_React$useContext, 2),
        currentLocation = _React$useContext2[0],
        setCurrentLocation = _React$useContext2[1];

    var searchBar = React.useRef(null);
    React.useEffect(function () {
        searchBar.current.focus();
    }, []);

    var handleSearchQuery = function handleSearchQuery(e) {
        if (searchBar.current.value.trim().length > 0) {
            var query = encodeURIComponent(searchBar.current.value);
            var response = axios.get("http://localhost:8084/basement-finder/search", {
                params: {
                    action: "searchByQuery",
                    query: query,
                    min: currentLocation.minPrice != null && currentLocation.maxPrice != null && currentLocation.maxPrice > currentLocation.minPrice ? currentLocation.minPrice : null,
                    max: currentLocation.minPrice != null && currentLocation.maxPrice != null && currentLocation.maxPrice > currentLocation.minPrice ? currentLocation.maxPrice : null
                }
            }).then(function (response) {
                var data = response.data;
                if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) == "object" && data != null && data.length > 0) {
                    dispatch({ type: SearchBarActions.NEWDATA, payload: data });
                } else {
                    dispatch({ type: SearchBarActions.HIDE, payload: null });
                }
            }).catch(function (res) {
                console.log("error: " + res);
            });
        } else {
            dispatch({ type: SearchBarActions.HIDE, payload: null });
        }
    };

    var searchBarFocusInHandler = function searchBarFocusInHandler(e) {
        e.target.parentNode.classList.add("search-bar-selected");
    };
    var searchBarFocusOutHandler = function searchBarFocusOutHandler(e) {
        e.target.parentNode.classList.remove("search-bar-selected");
        dispatch({ type: SearchBarActions.HIDE });
    };
    var searchResultClickedHandler = function searchResultClickedHandler() {
        dispatch({ type: SearchBarActions.HIDE });
    };
    return React.createElement(
        'div',
        { className: 'search-bar flex flex-row' },
        React.createElement('input', { type: 'text', autoComplete: 'off', placeholder: 'Search Basements...', name: 'query', onKeyUp: handleSearchQuery, ref: searchBar, onFocus: searchBarFocusInHandler, onBlur: searchBarFocusOutHandler }),
        React.createElement(
            'span',
            { className: 'material-icons', onClick: handleSearchQuery, style: { cursor: "pointer" } },
            'search'
        ),
        React.createElement(
            'div',
            { className: 'search-results', style: { display: searchResultState.visibility } },
            searchResultState.data != null ? searchResultState.data.map(function (data, i) {
                return React.createElement(SearchResult, { info: data, key: i, searchResultClickedHandler: searchResultClickedHandler });
            }) : null
        )
    );
}
export default React.memo(SearchBar);