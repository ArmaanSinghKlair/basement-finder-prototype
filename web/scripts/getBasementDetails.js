export function getBasementInfo(setAddress, placeId) {
    var service = new google.maps.places.PlacesService(document.createElement("div"));
    service.getDetails({
        placeId: placeId
    }, function (result, status) {
        if(result != null)
        setAddress(result.formatted_address);
    });
}