export var initialState = {
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    activated: null,
    base64Image: null,
    basements: null,
    refresh: true
};
export var UserInfoContext = React.createContext(null);

export default function UserInfoManager(_ref) {
    var initialState = _ref.initialState,
        children = _ref.children,
        reducer = _ref.reducer;

    return React.createElement(
        UserInfoContext.Provider,
        { value: React.useReducer(reducer, initialState) },
        children
    );
}