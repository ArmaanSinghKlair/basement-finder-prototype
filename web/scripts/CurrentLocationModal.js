var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { ENV } from './global.js';
import { getBasementInfo } from './getBasementDetails.js';
import SlideShowContainer from './SlideShowContainer.js';

function CurrentLocationModal(_ref) {
    var modalState = _ref.modalState,
        setModalState = _ref.setModalState;

    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        images = _React$useState2[0],
        setImages = _React$useState2[1];

    var _React$useState3 = React.useState(null),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        address = _React$useState4[0],
        setAddress = _React$useState4[1];

    var _React$useState5 = React.useState({
        firstName: "User",
        lastName: "not found",
        email: "Not found"
    }),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        userInfo = _React$useState6[0],
        setUserInfo = _React$useState6[1];

    React.useEffect(function () {
        if (modalState.placeId != null) {
            axios.get(ENV.PATH + "search", {
                params: {
                    action: "getImagesByPlaceId",
                    placeId: modalState.placeId
                }
            }).then(function (response) {
                if (response.data.searchResult == null) setImages(response.data);else setImages(null);
            });
            axios.get(ENV.PATH + "search", {
                params: {
                    action: "getUserByPlaceId",
                    placeId: modalState.placeId
                }
            }).then(function (response) {
                console.log(response);
                if (response.data.userFound) setUserInfo({
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                });
            });
        }
    }, [modalState.placeId]);

    React.useLayoutEffect(function () {
        if (modalState.placeId != null) getBasementInfo(setAddress, modalState.placeId);
    }, [modalState.placeId]);

    return React.createElement(
        'div',
        { style: { position: "fixed", left: 0, top: 0, width: window.innerWidth, height: window.innerHeight, zIndex: 5, transform: modalState.className == null ? "scale(0)" : "scale(1)" } },
        React.createElement('div', { className: 'current-location-modal--overlay overlay' }),
        React.createElement(
            'div',
            { className: 'current-location-modal modal flex flex-column ' + modalState.className },
            React.createElement(
                'div',
                { className: 'dashboard-basement-modal-close', onClick: function onClick() {
                        return setModalState(function (state) {
                            return Object.assign({}, state, { className: null });
                        });
                    } },
                React.createElement(
                    'span',
                    { className: 'material-icons' },
                    'disabled_by_default'
                )
            ),
            React.createElement(
                'div',
                { className: 'dashboard-basement-modal-images' },
                images == null || images.length == 0 || images.length == null ? React.createElement(
                    'div',
                    { className: 'dashboard-basement-modal-no-images flex flex-column' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'span',
                            { className: 'material-icons' },
                            'insert_photo'
                        ),
                        'No images uploaded'
                    )
                ) : React.createElement(SlideShowContainer, { images: images })
            ),
            React.createElement(
                'div',
                { className: 'dashboard-basement-details' },
                React.createElement(
                    'div',
                    { className: 'address' },
                    React.createElement(
                        'b',
                        null,
                        'Address:'
                    ),
                    ' ',
                    address
                ),
                React.createElement(
                    'div',
                    { className: 'description' },
                    React.createElement(
                        'b',
                        null,
                        'Description:'
                    ),
                    ' ',
                    unescape(modalState.description)
                ),
                React.createElement(
                    'div',
                    { className: 'place-id', title: modalState.placeId },
                    React.createElement(
                        'b',
                        null,
                        'Place ID:'
                    ),
                    ' ',
                    modalState.placeId
                ),
                React.createElement(
                    'div',
                    { className: 'price' },
                    React.createElement(
                        'b',
                        null,
                        'Monthly Rent:'
                    ),
                    ' $',
                    modalState.price
                )
            ),
            React.createElement(
                'div',
                { className: 'contact' },
                React.createElement(
                    'b',
                    null,
                    'Listed By:'
                ),
                ' ',
                userInfo.firstName,
                ' ',
                userInfo.lastName,
                ' | ',
                React.createElement(
                    'b',
                    null,
                    ' Email'
                ),
                ': ',
                userInfo.email
            )
        )
    );
}

export default React.memo(CurrentLocationModal);