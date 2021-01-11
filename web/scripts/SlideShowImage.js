function SlideShowImage(_ref) {
          var code = _ref.code,
              curPos = _ref.curPos,
              totPos = _ref.totPos,
              curSlide = _ref.curSlide;

          return React.createElement(
                    "div",
                    { className: "mySlides fade", style: { display: curSlide ? "block" : "none" } },
                    React.createElement(
                              "div",
                              { className: "numbertext" },
                              curPos,
                              "/",
                              totPos
                    ),
                    React.createElement("img", { src: code })
          );
}

export default React.memo(SlideShowImage);