import SearchResultBasement from './SearchResultBasement.js';

function SearchResultBasements({basements, displayModal}){
    
    return <div className="search-result-basements">
    {
      basements != null && basements.length > 0 ?
      basements.map((basement,i)=>  <div onClick={()=>displayModal(basement.placeId, basement.description, basement.price)}><SearchResultBasement  placeId={basement.placeId} price={basement.price} key={i} /></div>)
      :
              <div className="center flex flex-row basements-center"><span className="material-icons">apartment</span> <span>Searches here</span></div>
    }
    </div>
}
export default React.memo(SearchResultBasements);