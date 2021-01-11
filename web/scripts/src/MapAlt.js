function MapAlt(props){
    return (
            <div className="map-alt">
                <div className="overlay map-alt-overlay">
                    <div className="map-alt-overlay--modal modal">
                        <span className="material-icons">
                            foundation
                        </span>
                        You will see new beginnings here
                    </div>
                </div>
            </div>
            )
}

export default React.memo(MapAlt);