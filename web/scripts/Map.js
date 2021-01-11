import MapAlt from './MapAlt.js';

var Map = React.forwardRef(function (_ref, mapRef) {
        var placeId = _ref.placeId,
            latitude = _ref.latitude,
            longitude = _ref.longitude,
            doSearch = _ref.doSearch,
            city = _ref.city;


        return React.createElement(
                "div",
                { className: "map" },
                placeId != null || latitude != null && longitude != null || doSearch || city != null ? React.createElement("div", { className: "actual-map", id: "actualMap", ref: mapRef }) : React.createElement(MapAlt, null)
        );
});

export default React.memo(Map);