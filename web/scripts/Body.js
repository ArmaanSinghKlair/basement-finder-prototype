var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import Map from './Map.js';
import SearchResultBasements from './SearchResultBasements.js';
import { CurrentLocationContext, initialState } from './CurrentLocationManager.js';
import { CurrentLocationActions } from './CurrentLocationReducer.js';
import { ENV } from './global.js';
import CurrentLocationModal from './CurrentLocationModal.js';

function Body(_ref) {
    var setInfoMsg = _ref.setInfoMsg;

    var mapRef = React.useRef(null);

    var _React$useContext = React.useContext(CurrentLocationContext),
        _React$useContext2 = _slicedToArray(_React$useContext, 2),
        currentLocation = _React$useContext2[0],
        dispatch = _React$useContext2[1];

    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        basements = _React$useState2[0],
        setBasements = _React$useState2[1];

    var _React$useState3 = React.useState({
        placeId: null,
        description: null,
        price: null,
        className: null,
        email: null
    }),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        modalState = _React$useState4[0],
        setModalState = _React$useState4[1];

    var displayModal = React.useCallback(function (placeId, description, price) {
        setModalState({
            placeId: placeId,
            description: description,
            price: price,
            className: "animation-modal"
        });
    }, []);

    React.useEffect(function () {
        if (currentLocation.search.doSearch) {
            dispatch({
                type: CurrentLocationActions.ADD_ITEM,
                payload: {
                    search: {
                        doSearch: false,
                        action: null
                    }
                }
            });
        }
    }, [currentLocation]);

    React.useEffect(function () {
        if (mapRef.current == null) {
            mapRef.current = document.getElementById("actualMap");
        }

        //document.getElementById("actualMap")!=null && (currentLocation.latitude != null && currentLocation.longitude != null
        if (currentLocation.search.doSearch && mapRef.current !== null) {
            var curPos = {
                lat: currentLocation.latitude,
                lng: currentLocation.longitude
            };

            var newMarkers = [];
            var markers = void 0;
            // Getting markers around current position
            axios.get(ENV.PATH + "search", {
                params: Object.assign({}, currentLocation, {
                    action: currentLocation.search.action
                })
            }).then(function (response) {

                markers = response.data;
                console.log(response.data);
                if (markers != null && markers.length != 0) {
                    newMarkers = markers.map(function (marker) {

                        var curMarker = new google.maps.Marker({
                            position: {
                                lat: parseFloat(marker.latitude),
                                lng: parseFloat(marker.longitude)
                            },
                            animation: google.maps.Animation.DROP,
                            label: {
                                text: marker.price
                            },
                            icon: 'res/mapIcon.png'

                        });
                        curMarker.addListener("click", function () {
                            displayModal(marker.placeId, marker.description, marker.price);
                        });
                        return curMarker;
                    });

                    // If use uses current location, it will be set in currentLocation, if not get the location of first marker in search area
                    var mapCenter = curPos.lat != null && curPos.lng != null ? curPos : newMarkers[0].getPosition();
                    var map = new google.maps.Map(document.getElementById("actualMap"), {
                        zoom: 10,
                        center: mapCenter
                    });

                    new MarkerClusterer(map, newMarkers, {
                        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
                    });
                } else {
                    setInfoMsg({
                        visibility: 'block',
                        infoMsg: "No basements found"
                    });
                    dispatch({
                        type: CurrentLocationActions.ADD_ITEM,
                        payload: {
                            search: {
                                doSearch: false,
                                action: null
                            },
                            latitude: null,
                            longitude: null,
                            placeId: null,
                            city: null
                        }
                    });
                }
                setBasements(markers);
            }).catch(function (err) {
                console.log(err);
            });
            // GETTING markers END

        }
    }, [currentLocation.search]);

    return React.createElement(
        'div',
        { className: 'body grid' },
        React.createElement(CurrentLocationModal, { modalState: modalState, setModalState: setModalState }),
        React.createElement(Map, { ref: mapRef, placeId: currentLocation.placeId, latitude: currentLocation.latitude, longitude: currentLocation.longitude, doSearch: currentLocation.search.doSearch, city: currentLocation.city }),
        React.createElement(SearchResultBasements, { basements: basements, displayModal: displayModal })
    );
}

export default React.memo(Body);