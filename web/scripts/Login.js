import LoginHeader from './LoginHeader.js';
import LoginBody from './LoginBody.js';

function Login() {
    return React.createElement(
        'div',
        { className: 'main-login-container grid' },
        React.createElement(LoginHeader, null),
        React.createElement(LoginBody, null)
    );
}
ReactDOM.render(React.createElement(Login, null), document.getElementById("container"));