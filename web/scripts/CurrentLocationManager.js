export var initialState = {
    placeId: null,
    latitude: null,
    longitude: null,
    radius: null,
    minPrice: null,
    maxPrice: null,
    isSharing: false,
    search: {
        doSearch: false,
        action: null
    }

};
export var CurrentLocationContext = React.createContext(initialState);

export default function CurrentLocationManager(_ref) {
    var reducer = _ref.reducer,
        initialState = _ref.initialState,
        children = _ref.children;


    return React.createElement(
        CurrentLocationContext.Provider,
        { value: React.useReducer(reducer, initialState) },
        children
    );
}

/*
 *  placeId: null,
    latitude: null,
    longitude: null,
    radius: null,
    minPrice: null,
    maxPrice: null
 */