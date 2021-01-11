import SlideShowImage from './SlideShowImage.js';

function SlideShowContainer({images}){
    const [curSlide, setCurSlide] = React.useState(1);
    
    const plusSlides =(n)=> {
        if(curSlide + n > images.length)
            setCurSlide(1);
        else if(curSlide + n <= 0)
            setCurSlide(images.length);
        else
            setCurSlide(curSlide=>curSlide+n)
    }

    const currentSlide = (n)=> {
        setCurSlide(n);
    }
    
    React.useEffect(()=>{
       return ()=>{
           setCurSlide(1);
       } 
    },[])
    return (
             <div>
                    <div className="slideshow-container">

                    {images != null && images.length > 0 && images.map ? images.map((image,index)=> <SlideShowImage code={image.code} curSlide={curSlide == index+1 ? true : false} curPos={index+1} totPos={images.length} key={index}/>) : null}
                    
                    
                    <a className="prev" onClick={()=>plusSlides(-1)}>&#10094;</a>
                    <a className="next" onClick={()=>plusSlides(1)}>&#10095;</a>

                    </div>

                    <div style={{textAlign:"center"}}>
                    {images != null && images.length > 0 && images.map? images.map((image,index)=> <span className={`dot ${curSlide == index+1?"active":""}`} onClick={()=>currentSlide(index+1)} key={index}></span> ):null}
                    </div>
                </div>
            )
}

export default SlideShowContainer;