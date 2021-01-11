var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { CurrentLocationContext } from './CurrentLocationManager.js';
import { CurrentLocationActions } from './CurrentLocationReducer.js';

function SearchResult(_ref) {
    var info = _ref.info,
        searchResultClickedHandler = _ref.searchResultClickedHandler,
        remainingProps = _objectWithoutProperties(_ref, ['info', 'searchResultClickedHandler']);

    var _React$useContext = React.useContext(CurrentLocationContext),
        _React$useContext2 = _slicedToArray(_React$useContext, 2),
        currentLocation = _React$useContext2[0],
        dispatch = _React$useContext2[1];

    var handleMouseDown = function handleMouseDown(e) {
        var city = encodeURIComponent(e.target.dataset.city);
        var country = encodeURIComponent(e.target.dataset.country);
        dispatch({
            type: CurrentLocationActions.ADD_ITEM,
            payload: {
                city: city,
                country: country,
                search: {
                    doSearch: true,
                    action: "searchByCity"
                }
            }
        });
        searchResultClickedHandler();
        /*
            let response =  axios.get("http://localhost:8084/basement-finder/search",{
                    params: Object.assign(location,{
                         action: "searchByCity",
                            city: city,
                            country:country
                    })
                }).then(response => {
                   let data = response.data;
                   console.log(data);
                    if(typeof data == "object" && data != null && data.length > 0 ){
                        dispatch({type:CurrentLocationActions.ADD_ITEM, payload: data});
                     }  
                }).catch(res=>{
                    console.log("error: "+res);
                })*/
    };
    return React.createElement(
        'div',
        { 'data-city': info.city, 'data-country': info.country, onMouseDown: handleMouseDown, className: 'search-results--result flex flex-row' },
        React.createElement(
            'span',
            { className: 'material-icons search-result--result--icon' },
            'room'
        ),
        info.city
    );
}

export default React.memo(SearchResult);