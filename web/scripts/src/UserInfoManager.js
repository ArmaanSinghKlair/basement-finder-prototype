export const initialState = {
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    activated: null,
    base64Image: null,
    basements: null,
    refresh: true
}
export const UserInfoContext = React.createContext(null);

export default function UserInfoManager({initialState, children, reducer}){
        return (<UserInfoContext.Provider value={React.useReducer(reducer, initialState)}>
            {children}
        </UserInfoContext.Provider>)
}
