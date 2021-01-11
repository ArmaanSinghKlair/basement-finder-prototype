function SlideShowImage({code, curPos, totPos, curSlide}){
    return (
            <div className="mySlides fade" style={{display: curSlide ? "block": "none"}}>
                      <div className="numbertext">{curPos}/{totPos}</div>
                      <img src={code} />
            </div>
            )
}

export default React.memo(SlideShowImage);