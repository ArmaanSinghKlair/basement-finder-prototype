export const initialState = {
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
    
}
export const CurrentLocationContext = React.createContext(initialState)

export default function CurrentLocationManager({reducer, initialState, children}){
        
    return <CurrentLocationContext.Provider value={React.useReducer(reducer, initialState)}>
    {children}
    </CurrentLocationContext.Provider>
}

/*
 *  placeId: null,
    latitude: null,
    longitude: null,
    radius: null,
    minPrice: null,
    maxPrice: null
 */