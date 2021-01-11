import {ENV} from './global.js';

function LoginBody(props){
    const [passwordHelp, setPasswordHelp] = React.useState(null);
    const [usernameHelp, setUsernameHelp] = React.useState(null);
    const usernameField = React.useRef(null);
    const passwordField = React.useRef(null);
    
    React.useEffect(()=>{
        usernameField.current.focus()
    },[])
    const UsernameHandler = () =>{
         if(/.{1,50}/.test(usernameField.current.value)){
            if(/^[\w\d@#]{1,50}$/.test(usernameField.current.value)){
            usernameField.current.classList.toggle("invalid-input",false);
            usernameField.current.classList.toggle("valid-input",true);
            setUsernameHelp(null);
            
                    
        }else{
            usernameField.current.classList.toggle("invalid-input",true);
            usernameField.current.classList.toggle("valid-input",false);
            setUsernameHelp("Can only contain a-z A-Z 0-9 _ @ #");
        }
            
        } else{
            usernameField.current.classList.toggle("invalid-input",true);
            usernameField.current.classList.toggle("valid-input",false);
            setUsernameHelp("Must be at least 1 and at most 50 characters");
        }
    }
    
    const PasswordHandler = () =>{
        if(/.{8,80}/.test(passwordField.current.value)){
            if(/^[\w\d@#]{8,80}$/.test(passwordField.current.value)){
            passwordField.current.classList.toggle("invalid-input",false);
            passwordField.current.classList.toggle("valid-input",true);
            setPasswordHelp(null);
        }else{
            passwordField.current.classList.toggle("invalid-input",true);
            passwordField.current.classList.toggle("valid-input",false);
            setPasswordHelp("Can only contain a-z A-Z 0-9 _ @ #");
        }
            
        } else{
            passwordField.current.classList.toggle("invalid-input",true);
            passwordField.current.classList.toggle("valid-input",false);
            setPasswordHelp("Must be at least 8 and at most 80 characters");
        }
    }
    const SubmitHandler = e=>{
        let formData = {
            username: usernameField.current.value,
            password: passwordField.current.value,
            action: "login"
        }
       
        axios({
                method:"post",
                url:ENV.PATH+"login",
                data: formData
            
        }).then(response=>{
            console.log(response.data);
            if(!response.data.loginSuccessfull){
                setPasswordHelp(response.data.error)
            } else{
                location.assign(ENV.PATH+"dashboard");
            }
        })
    }
    return (
            <div className="login-body-container grid-center">
            <div className="login-form-container flex flex-column">
                <h1><span className="material-icons">login</span> Login to Advertise</h1>
                <label htmlFor="username">
                <span className="label-text label-text-username">Username</span>
                    <input type="text" name="username" onKeyUp={UsernameHandler} id="username" autoComplete="off" ref={usernameField}/>
                    <span className="username-help help">
                        {usernameHelp}
                    </span>
                </label>
                <label htmlFor="password">
                <span className="label-text label-text-password">Password</span>
                    <input type="text" name="password" id="password" onKeyUp={PasswordHandler} autoComplete="off" ref={passwordField}/>
                    <span className="password-help help">
                        {passwordHelp}
                    </span>
                </label>
                
    <button className="submit" onClick={SubmitHandler}>Login</button>
            </div>
            </div>
    )
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