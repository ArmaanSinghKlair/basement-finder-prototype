import {ENV} from './global.js'

function AddBasements(props){
    const basementLocationRef = React.useRef(null);
    const sharingRef = React.useRef(null);
    const priceRef = React.useRef(null);
    const descriptionRef = React.useRef(null);
    const [descriptionError, setDescriptionError] = React.useState('');
    const [priceError, setPriceError] = React.useState('');
    const [locationError, setLocationError] = React.useState('');
    
    React.useEffect(()=>{
        const autocomplete = new google.maps.places.Autocomplete(basementLocationRef.current);
        
        autocomplete.setFields(['formatted_address','geometry','place_id',]);
        
        autocomplete.addListener("place_changed",()=>{
            const place = autocomplete.getPlace();
            console.log(place)
            if(place.geometry && place.formatted_address && place.place_id){
                let address = place.formatted_address.split(",");
                basementLocationRef.current.dataset.latitude = place.geometry.location.lat();
                basementLocationRef.current.dataset.longitude = place.geometry.location.lng();
                basementLocationRef.current.dataset.country = address[address.length-1].trim();
                basementLocationRef.current.dataset.state = address[address.length-2].trim();
                basementLocationRef.current.dataset.city = address[address.length-3].trim();
                basementLocationRef.current.dataset.placeId = place.place_id;
        }
        });
    },[])
    
    const descriptionHandler =e=>{
        if(e.currentTarget.value.length <= 1 || e.currentTarget.value.length > 500)
            setDescriptionError("Must be at least 2 and at most 500- Current = "+e.currentTarget.value.length+" words");
        else
            setDescriptionError('');
    }
    const priceHandler =e=>{
        if(parseFloat(e.currentTarget.value) < 1)
            setPriceError("Price cannot be negative");
        else if(parseFloat(e.currentTarget.value) > 5000)
            setPriceError("Price cannot be more than 5000")
        else
            setPriceError('')
    }
    const submitHandler =()=>{
        if(descriptionError.trim() == '' && priceError.trim() == ''){
            if(basementLocationRef.current.value.trim() == ""){
               setLocationError('Basement location required')
            } else if(priceRef.current.value.trim() == ''){
                setPriceError("Price required");
                setLocationError("");
            } else if(descriptionRef.current.value.trim() == ''){
                setDescriptionError("Description required");
                setLocationError("");
                setPriceError("");
            } else{
                axios({
                    url: ENV.PATH+"dashboard",
                    method: "post",
                    data:{
                        action: "addBasement",
                        placeId: basementLocationRef.current.dataset.placeId,
                        latitude: basementLocationRef.current.dataset.latitude,
                        longitude: basementLocationRef.current.dataset.longitude,
                        country: basementLocationRef.current.dataset.country,
                        state: basementLocationRef.current.dataset.state,
                        city: basementLocationRef.current.dataset.city,
                        price: priceRef.current.value,
                        isSharing: sharingRef.current.checked?"true":"false",
                        description: descriptionRef.current.value
                    }
                }).then(response=>{
                  if(response.data.basementAdditionSuccessfull){
                      location.reload();
                  }  else{
                      setDescriptionError(response.data.errMsg);
                  }
                })
            }
        }
    }

    return (
            <div className="add-basement flex flex-column">
    <h4>Add basement</h4>
            <label htmlFor="placeSearch" className="flex flex-row">
                <input type="text" ref={basementLocationRef} style={{width: "100%"}} id="basement-location-search"/>
            </label>
                <span className="error">{locationError}</span>

            <label htmlFor="price" className="flex flex-row">
                Price: $
                <input type="number" min="1" step="0.01" onKeyUp={priceHandler} ref={priceRef}/>
            </label>
            <span className="error">{priceError}</span>
            <label htmlFor="sharing" className="flex flex-row">
            <span>Sharing</span>
                <input type="checkbox" ref={sharingRef}/>
            </label>
            <label htmlFor="description" className="flex flex-row">
                Description
                <textarea onKeyUp={descriptionHandler} ref={descriptionRef} defaultValue="Include things that help people know the basement well"></textarea>
    </label>
    <span className="error">{descriptionError}</span>
    <button className="add-basement-cta" onClick={submitHandler}>Add</button>
            </div>
            )
}
export default React.memo(AddBasements);