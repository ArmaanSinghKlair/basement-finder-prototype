var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import SearchBar from './SearchBar.js';
import { CurrentLocationContext } from './CurrentLocationManager.js';
import { CurrentLocationActions } from './CurrentLocationReducer.js';

function SearchHeader(props) {
    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        priceRangeVisibility = _React$useState2[0],
        setPriceRangeVisibility = _React$useState2[1];

    var _React$useContext = React.useContext(CurrentLocationContext),
        _React$useContext2 = _slicedToArray(_React$useContext, 2),
        currentLocation = _React$useContext2[0],
        dispatch = _React$useContext2[1];

    var handleIsSharing = function handleIsSharing() {
        dispatch({
            type: CurrentLocationActions.ADD_ITEM,
            payload: {
                isSharing: !currentLocation.isSharing
            }
        });
    };

    var handleRadiusChange = function handleRadiusChange(e) {
        dispatch({
            type: CurrentLocationActions.ADD_ITEM,
            payload: {
                radius: e.target.value
            }
        });
    };

    var minPriceHandler = function minPriceHandler(e) {
        dispatch({
            type: CurrentLocationActions.ADD_ITEM,
            payload: {
                minPrice: e.target.value
            }
        });
    };
    var maxPriceHandler = function maxPriceHandler(e) {
        dispatch({
            type: CurrentLocationActions.ADD_ITEM,
            payload: {
                maxPrice: e.target.value
            }
        });
    };

    return React.createElement(
        'div',
        { className: 'search-header flex flex-row' },
        React.createElement(
            'div',
            { className: 'filters flex flex-row' },
            React.createElement(
                'div',
                { className: 'filters--filter price' },
                currentLocation.minPrice == null || currentLocation.maxPrice == null ? React.createElement(
                    'span',
                    { className: 'flex flex-row', onClick: function onClick() {
                            return setPriceRangeVisibility(!priceRangeVisibility);
                        } },
                    'Price Range ',
                    React.createElement(
                        'span',
                        { className: 'material-icons' },
                        'expand_more'
                    )
                ) : React.createElement(
                    'span',
                    { className: 'min-max', onClick: function onClick() {
                            return setPriceRangeVisibility(!priceRangeVisibility);
                        } },
                    '$',
                    currentLocation.minPrice,
                    ' - $',
                    currentLocation.maxPrice
                ),
                React.createElement(
                    'div',
                    { className: 'price-dialog flex flex-column', style: { display: priceRangeVisibility ? 'block' : 'none' } },
                    React.createElement(
                        'label',
                        { htmlFor: 'min' },
                        'Minimum $',
                        currentLocation.minPrice != null ? currentLocation.minPrice : 0,
                        React.createElement('input', { type: 'range', min: '0', max: '5000', step: '10', id: 'min', name: 'minPrice', onChange: minPriceHandler })
                    ),
                    React.createElement(
                        'label',
                        { htmlFor: 'max' },
                        'Maximum $',
                        currentLocation.maxPrice != null ? currentLocation.maxPrice : 0,
                        React.createElement('input', { type: 'range', min: currentLocation.minPrice != null ? currentLocation.minPrice : 0, max: '5000', step: '10', id: 'max', name: 'maxPrice', onChange: maxPriceHandler })
                    ),
                    React.createElement(
                        'button',
                        { className: 'info-msg-close', onClick: function onClick() {
                                return setPriceRangeVisibility(!priceRangeVisibility);
                            } },
                        'Done'
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'filters--filter checkbox' },
                React.createElement(
                    'span',
                    { className: 'flex flex-row' },
                    'Sharing',
                    React.createElement('input', { type: 'checkbox', name: 'sharing', onClick: handleIsSharing })
                )
            ),
            React.createElement(
                'div',
                { className: 'filters--filter radius' },
                React.createElement(
                    'span',
                    { className: 'flex flex-row' },
                    'Search Radius',
                    React.createElement(
                        'select',
                        { name: 'range', onChange: handleRadiusChange },
                        Array(9).fill(null).map(function (v, i) {
                            return React.createElement(
                                'option',
                                { value: (i + 1) * 10, key: i },
                                (i + 1) * 10,
                                ' km'
                            );
                        })
                    )
                )
            )
        ),
        React.createElement(SearchBar, null)
    );
}

export default React.memo(SearchHeader);