var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { ENV } from './global.js';

function LoginBody(props) {
    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        passwordHelp = _React$useState2[0],
        setPasswordHelp = _React$useState2[1];

    var _React$useState3 = React.useState(null),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        usernameHelp = _React$useState4[0],
        setUsernameHelp = _React$useState4[1];

    var usernameField = React.useRef(null);
    var passwordField = React.useRef(null);

    React.useEffect(function () {
        usernameField.current.focus();
    }, []);
    var UsernameHandler = function UsernameHandler() {
        if (/.{1,50}/.test(usernameField.current.value)) {
            if (/^[\w\d@#]{1,50}$/.test(usernameField.current.value)) {
                usernameField.current.classList.toggle("invalid-input", false);
                usernameField.current.classList.toggle("valid-input", true);
                setUsernameHelp(null);
            } else {
                usernameField.current.classList.toggle("invalid-input", true);
                usernameField.current.classList.toggle("valid-input", false);
                setUsernameHelp("Can only contain a-z A-Z 0-9 _ @ #");
            }
        } else {
            usernameField.current.classList.toggle("invalid-input", true);
            usernameField.current.classList.toggle("valid-input", false);
            setUsernameHelp("Must be at least 1 and at most 50 characters");
        }
    };

    var PasswordHandler = function PasswordHandler() {
        if (/.{8,80}/.test(passwordField.current.value)) {
            if (/^[\w\d@#]{8,80}$/.test(passwordField.current.value)) {
                passwordField.current.classList.toggle("invalid-input", false);
                passwordField.current.classList.toggle("valid-input", true);
                setPasswordHelp(null);
            } else {
                passwordField.current.classList.toggle("invalid-input", true);
                passwordField.current.classList.toggle("valid-input", false);
                setPasswordHelp("Can only contain a-z A-Z 0-9 _ @ #");
            }
        } else {
            passwordField.current.classList.toggle("invalid-input", true);
            passwordField.current.classList.toggle("valid-input", false);
            setPasswordHelp("Must be at least 8 and at most 80 characters");
        }
    };
    var SubmitHandler = function SubmitHandler(e) {
        var formData = {
            username: usernameField.current.value,
            password: passwordField.current.value,
            action: "login"
        };

        axios({
            method: "post",
            url: ENV.PATH + "login",
            data: formData

        }).then(function (response) {
            console.log(response.data);
            if (!response.data.loginSuccessfull) {
                setPasswordHelp(response.data.error);
            } else {
                location.assign(ENV.PATH + "dashboard");
            }
        });
    };
    return React.createElement(
        "div",
        { className: "login-body-container grid-center" },
        React.createElement(
            "div",
            { className: "login-form-container flex flex-column" },
            React.createElement(
                "h1",
                null,
                React.createElement(
                    "span",
                    { className: "material-icons" },
                    "login"
                ),
                " Login to Advertise"
            ),
            React.createElement(
                "label",
                { htmlFor: "username" },
                React.createElement(
                    "span",
                    { className: "label-text label-text-username" },
                    "Username"
                ),
                React.createElement("input", { type: "text", name: "username", onKeyUp: UsernameHandler, id: "username", autoComplete: "off", ref: usernameField }),
                React.createElement(
                    "span",
                    { className: "username-help help" },
                    usernameHelp
                )
            ),
            React.createElement(
                "label",
                { htmlFor: "password" },
                React.createElement(
                    "span",
                    { className: "label-text label-text-password" },
                    "Password"
                ),
                React.createElement("input", { type: "text", name: "password", id: "password", onKeyUp: PasswordHandler, autoComplete: "off", ref: passwordField }),
                React.createElement(
                    "span",
                    { className: "password-help help" },
                    passwordHelp
                )
            ),
            React.createElement(
                "button",
                { className: "submit", onClick: SubmitHandler },
                "Login"
            )
        )
    );
}

export default React.memo(LoginBody);

/**
 *  axios.get(ENV.PATH+"login",{
            params:{
                action: "usrch",
                username: e.target.value
            }
        }).then(response=>{
            if(response.data == true)
                setUsernameHelp("Username already exists");
            else
                setUsernameHelp(null);
        })
 */