export function getBasementInfo(setAddress, placeId){
    let service = new google.maps.places.PlacesService(document.createElement("div"));
        service.getDetails({
            placeId:placeId
        },(result, status)=>{
            setAddress(result.formatted_address);
        })
}

