var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { ENV } from './global.js';

function DashboardBasement(_ref) {
    var basement = _ref.basement,
        displayModal = _ref.displayModal;

    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        imageCode = _React$useState2[0],
        setImageCode = _React$useState2[1];

    React.useEffect(function () {
        axios.get(ENV.PATH + "dashboard", {
            params: {
                action: "getSingleImageByPlaceId",
                placeId: basement.placeId
            }
        }).then(function (response) {
            if (response.data.searchResult) {
                setImageCode(response.data.code);
            }
        });
    }, []);

    return React.createElement(
        "div",
        { className: "dashboard-basement flex flex-column", "data-placeid": basement.placeId, "data-description": basement.description, "data-price": basement.price, onClick: displayModal },
        imageCode == null ? React.createElement(
            "span",
            { className: "material-icons", style: { padding: "100px" } },
            "apartment"
        ) : React.createElement("img", { src: imageCode, className: "basement-image", alt: "basement image" }),
        React.createElement(
            "div",
            { className: "dashboard-basement--info flex flex-column" },
            React.createElement(
                "span",
                { className: "info--main-info" },
                basement.city,
                ", ",
                basement.state,
                ", ",
                basement.country
            ),
            React.createElement(
                "span",
                { className: "info--sub-info" },
                React.createElement(
                    "b",
                    null,
                    "$",
                    basement.price
                )
            ),
            React.createElement(
                "span",
                { className: "info--sub-sub-info" },
                React.createElement(
                    "b",
                    null,
                    "(",
                    basement.sharing ? "Shared" : "Not shared",
                    ")"
                )
            )
        )
    );
}

export default React.memo(DashboardBasement);