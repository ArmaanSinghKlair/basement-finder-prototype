export const UserInfoActions={
    ADD_EDIT_ITEM: 'edit_item'
}
export default function UserInfoReducer(state, action){
        switch(action.type){
            case UserInfoActions.ADD_EDIT_ITEM:
                return {
                            ...state,
                            ...action.payload
                }
                break;
        }
}