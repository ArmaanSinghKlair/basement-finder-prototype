import LoginHeader from './LoginHeader.js';
import LoginBody from './LoginBody.js';

function Login(){
    return (
            <div className="main-login-container grid">
                <LoginHeader />
                <LoginBody />
            
            </div>
              );
}
ReactDOM.render(<Login/>,document.getElementById("container"));
             