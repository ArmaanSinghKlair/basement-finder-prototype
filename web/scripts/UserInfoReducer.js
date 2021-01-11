export var UserInfoActions = {
    ADD_EDIT_ITEM: 'edit_item'
};
export default function UserInfoReducer(state, action) {
    switch (action.type) {
        case UserInfoActions.ADD_EDIT_ITEM:
            return Object.assign({}, state, action.payload);
            break;
    }
}