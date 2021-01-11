import SearchBar from './SearchBar.js';

function LoginHeader(props){
    
    return (
            <div className="header flex flex-row">
            
            <div className="logo">
            <span className="logo--base">BASE</span>
            <span className="logo--ments">MENTS</span>
            </div>
            
            <div className="flex flex-row header-not-logo" >
               

                 <button className="login flex flex-row" onClick={()=>location.assign(ENV.PATH+"dashboard")}><span className="material-icons search-result--result--icon">login</span> Dashboard</button>

            </div>
            </div>
            );
}

export default React.memo(LoginHeader);