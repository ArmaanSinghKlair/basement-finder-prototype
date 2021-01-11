var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { ENV } from './global.js';

function EditProfile(props) {
    var basementLocationRef = React.useRef(null);
    var sharingRef = React.useRef(null);
    var priceRef = React.useRef(null);
    var descriptionRef = React.useRef(null);

    var _React$useState = React.useState(''),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        descriptionError = _React$useState2[0],
        setDescriptionError = _React$useState2[1];

    var _React$useState3 = React.useState(''),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        priceError = _React$useState4[0],
        setPriceError = _React$useState4[1];

    var _React$useState5 = React.useState(''),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        locationError = _React$useState6[0],
        setLocationError = _React$useState6[1];

    React.useEffect(function () {
        var autocomplete = new google.maps.places.Autocomplete(basementLocationRef.current);

        autocomplete.setFields(['formatted_address', 'geometry', 'place_id']);

        autocomplete.addListener("place_changed", function () {
            var place = autocomplete.getPlace();
            console.log(place);
            if (place.geometry && place.formatted_address && place.place_id) {
                var address = place.formatted_address.split(",");
                basementLocationRef.current.dataset.latitude = place.geometry.location.lat();
                basementLocationRef.current.dataset.longitude = place.geometry.location.lng();
                basementLocationRef.current.dataset.country = address[address.length - 1].trim();
                basementLocationRef.current.dataset.state = address[address.length - 2].trim();
                basementLocationRef.current.dataset.city = address[address.length - 3].trim();
                basementLocationRef.current.dataset.placeId = place.place_id;
            }
        });
    }, []);

    var descriptionHandler = function descriptionHandler(e) {
        if (e.currentTarget.value.length <= 1 || e.currentTarget.value.length > 500) setDescriptionError("Must be at least 2 and at most 500");else setDescriptionError('');
    };
    var priceHandler = function priceHandler(e) {
        if (parseFloat(e.currentTarget.value) < 1) setPriceError("Price cannot be negative");else if (parseFloat(e.currentTarget.value) > 5000) setPriceError("Price cannot be more than 5000");else setPriceError('');
    };
    var submitHandler = function submitHandler() {
        if (descriptionError.trim() == '' && priceError.trim() == '') {
            if (basementLocationRef.current.value.trim() == "") {
                setLocationError('Basement location required');
            } else if (priceRef.current.value.trim() == '') {
                setPriceError("Price required");
                setLocationError("");
            } else if (descriptionRef.current.value.trim() == '') {
                setDescriptionError("Description required");
                setLocationError("");
                setPriceError("");
            } else {
                axios({
                    url: ENV.PATH + "dashboard",
                    method: "post",
                    data: {
                        action: "addBasement",
                        placeId: basementLocationRef.current.dataset.placeId,
                        latitude: basementLocationRef.current.dataset.latitude,
                        longitude: basementLocationRef.current.dataset.longitude,
                        country: basementLocationRef.current.dataset.country,
                        state: basementLocationRef.current.dataset.state,
                        city: basementLocationRef.current.dataset.city,
                        price: priceRef.current.value,
                        isSharing: sharingRef.current.checked ? "true" : "false",
                        description: descriptionRef.current.value
                    }
                }).then(function (response) {
                    if (response.data.basementAdditionSuccessfull) {
                        location.reload();
                    } else {
                        setDescriptionError(response.data.errMsg);
                    }
                });
            }
        }
    };

    return React.createElement(
        'div',
        { className: 'add-basement flex flex-column' },
        React.createElement(
            'h4',
            null,
            'Add basement'
        ),
        React.createElement(
            'label',
            { htmlFor: 'placeSearch', className: 'flex flex-row' },
            React.createElement('input', { type: 'text', ref: basementLocationRef, style: { width: "100%" }, id: 'basement-location-search' })
        ),
        React.createElement(
            'span',
            { className: 'error' },
            locationError
        ),
        React.createElement(
            'label',
            { htmlFor: 'price', className: 'flex flex-row' },
            'Price: $',
            React.createElement('input', { type: 'number', min: '1', step: '0.01', onKeyUp: priceHandler, ref: priceRef })
        ),
        React.createElement(
            'span',
            { className: 'error' },
            priceError
        ),
        React.createElement(
            'label',
            { htmlFor: 'sharing', className: 'flex flex-row' },
            React.createElement(
                'span',
                null,
                'Sharing'
            ),
            React.createElement('input', { type: 'checkbox', ref: sharingRef })
        ),
        React.createElement(
            'label',
            { htmlFor: 'description', className: 'flex flex-row' },
            'Description',
            React.createElement('textarea', { onKeyUp: descriptionHandler, ref: descriptionRef, defaultValue: 'Include things that help people know the basement well' })
        ),
        React.createElement(
            'span',
            { className: 'error' },
            descriptionError
        ),
        React.createElement(
            'button',
            { className: 'add-basement-cta', onClick: submitHandler },
            'Add'
        )
    );
}
export default React.memo(EditProfile);