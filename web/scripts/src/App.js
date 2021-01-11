import Header from './Header.js';
import Body from './Body.js';
import SearchHeader from './SearchHeader.js';
import CurrentLocationManager, {initialState} from './CurrentLocationManager.js';
import CurrentLocationReducer from './CurrentLocationReducer.js';

function App(){
    const[infoMsg, setInfoMsg] = React.useState({
        visibility: 'none',
        infoMsg: null
    });
    const infoMsgCloseHandler = e=>{
        setInfoMsg({
            visibility: 'none',
            infoMsg: null
        })
    }
    
    return (
            <div className="main-container grid">
            <CurrentLocationManager initialState={initialState} reducer={CurrentLocationReducer} >
                <Header setInfoMsg={setInfoMsg} />
                <SearchHeader />
                <Body setInfoMsg={setInfoMsg} />
            </CurrentLocationManager>
            <div className="overlay main-info-overlay" style={{display: infoMsg.visibility}}>
                <div className="modal main-info-modal flex flex-column">
                    <span className="main-info-modal-message flex flex-row">
                        <span className="material-icons">report_problem</span>  {infoMsg.infoMsg} 
                     </span>
                     <span className="main-info-modal-cta">
                        <button className="info-msg-close" onClick={infoMsgCloseHandler}>OK</button>
                     </span>
            </div>
            </div>
            </div>
              );
}
ReactDOM.render(<App/>,document.getElementById("container"));
        
        /*
              *  axios.get("http://localhost:8084/basement-finder/search",{
            params: {
                action: "searchByQuery",
                query: e.target.value
            }
        }).then(response => {
                let basements = response.data;
               
                
        });

 <Header />
            <Body />
              */       