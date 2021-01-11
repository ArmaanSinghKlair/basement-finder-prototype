var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import SlideShowImage from './SlideShowImage.js';

function SlideShowContainer(_ref) {
    var images = _ref.images;

    var _React$useState = React.useState(1),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        curSlide = _React$useState2[0],
        setCurSlide = _React$useState2[1];

    var plusSlides = function plusSlides(n) {
        if (curSlide + n > images.length) setCurSlide(1);else if (curSlide + n <= 0) setCurSlide(images.length);else setCurSlide(function (curSlide) {
            return curSlide + n;
        });
    };

    var currentSlide = function currentSlide(n) {
        setCurSlide(n);
    };

    React.useEffect(function () {
        return function () {
            setCurSlide(1);
        };
    }, []);
    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "slideshow-container" },
            images != null && images.length > 0 && images.map ? images.map(function (image, index) {
                return React.createElement(SlideShowImage, { code: image.code, curSlide: curSlide == index + 1 ? true : false, curPos: index + 1, totPos: images.length, key: index });
            }) : null,
            React.createElement(
                "a",
                { className: "prev", onClick: function onClick() {
                        return plusSlides(-1);
                    } },
                "\u276E"
            ),
            React.createElement(
                "a",
                { className: "next", onClick: function onClick() {
                        return plusSlides(1);
                    } },
                "\u276F"
            )
        ),
        React.createElement(
            "div",
            { style: { textAlign: "center" } },
            images != null && images.length > 0 && images.map ? images.map(function (image, index) {
                return React.createElement("span", { className: "dot " + (curSlide == index + 1 ? "active" : ""), onClick: function onClick() {
                        return currentSlide(index + 1);
                    }, key: index });
            }) : null
        )
    );
}

export default SlideShowContainer;