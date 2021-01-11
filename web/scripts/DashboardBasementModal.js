var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { ENV } from './global.js';
import { getBasementInfo } from './getBasementDetails.js';
import { UserInfoContext } from './UserInfoManager.js';
import SlideShowContainer from './SlideShowContainer.js';

function DashboardBasementModal(_ref) {
    var modalState = _ref.modalState,
        setModalState = _ref.setModalState,
        displayModal = _ref.displayModal;

    var uploadImagesRef = React.useRef(null);

    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        images = _React$useState2[0],
        setImages = _React$useState2[1];

    var _React$useState3 = React.useState(null),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        address = _React$useState4[0],
        setAddress = _React$useState4[1];

    var _React$useContext = React.useContext(UserInfoContext),
        _React$useContext2 = _slicedToArray(_React$useContext, 2),
        userInfo = _React$useContext2[0],
        dispatch = _React$useContext2[1];

    var _React$useState5 = React.useState(null),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        deletionStatus = _React$useState6[0],
        setDeletionStatus = _React$useState6[1];

    React.useEffect(function () {
        if (userInfo.basements != null && userInfo.basements.length > 0 && modalState.placeId != null) {
            axios.get(ENV.PATH + "dashboard", {
                params: {
                    action: "getImagesByPlaceId",
                    placeId: modalState.placeId
                }
            }).then(function (response) {
                console.log(response);
                if (response.data.searchResult == null) setImages(response.data);
            });
        }
    }, [modalState.placeId]);

    React.useLayoutEffect(function () {
        if (modalState.placeId != null) getBasementInfo(setAddress, modalState.placeId);
    }, [modalState.placeId]);

    var removeBasement = function removeBasement(e) {
        axios({
            url: ENV.PATH + "dashboard",
            method: "post",
            data: {
                action: "dlBs",
                placeId: e.target.dataset.placeid
            }
        }).then(function (response) {
            if (!response.data.deletionSuccessfull) setDeletionStatus(response.data.errMsg);else location.reload();
        });
    };

    var uploadImages = function uploadImages(e) {
        var files = uploadImagesRef.current.files;
        var data = new FormData();
        var file = void 0;
        if (files.length == 0) {
            setDeletionStatus("At least one image needed");
            return;
        }
        if (files.length > 7) {
            setDeletionStatus("At most 7 images allowed");
            return;
        }

        Object.values(files).forEach(function (file, index) {
            data.append(index, file, file.name);
        });

        axios({
            method: "post",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            url: ENV.PATH + "dashboard",
            params: {
                action: "uploadBasementImages",
                placeId: modalState.placeId
            }

        }).then(function (response) {
            if (response.data.imageUpdationSuccessfull) location.reload();else setDeletionStatus(response.data.errMsg);
        });
    };
    return React.createElement(
        'div',
        { className: 'dashboard-basement-modal modal flex flex-column ' + modalState.className, style: { position: "fixed" } },
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
            images == null || images.length == 0 ? React.createElement(
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
                ),
                React.createElement(
                    'div',
                    { className: 'upload-images' },
                    React.createElement(
                        'label',
                        { htmlFor: 'uploadImages' },
                        'Choose Files',
                        React.createElement('input', { type: 'file', id: 'uploadImages', multiple: true, ref: uploadImagesRef })
                    ),
                    React.createElement(
                        'button',
                        { id: 'uploadImages', onClick: uploadImages },
                        'Upload'
                    )
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
            ),
            React.createElement(
                'span',
                { className: 'error' },
                deletionStatus
            )
        ),
        React.createElement(
            'div',
            { className: 'dashboard-basement-cta' },
            React.createElement(
                'button',
                { 'data-placeid': modalState.placeId, onClick: removeBasement },
                'Remove listing'
            )
        )
    );
}

export default DashboardBasementModal;