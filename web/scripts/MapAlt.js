function MapAlt(props) {
    return React.createElement(
        "div",
        { className: "map-alt" },
        React.createElement(
            "div",
            { className: "overlay map-alt-overlay" },
            React.createElement(
                "div",
                { className: "map-alt-overlay--modal modal" },
                React.createElement(
                    "span",
                    { className: "material-icons" },
                    "foundation"
                ),
                "You will see new beginnings here"
            )
        )
    );
}

export default React.memo(MapAlt);