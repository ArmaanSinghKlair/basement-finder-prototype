export const CurrentLocationActions = {
    ADD_ITEM: 'addItem',
    CLEAR_LOCATION: 'clearLocation',
}
export default function CurrentLocationReducer(state, action){

        switch(action.type){
            case CurrentLocationActions.ADD_ITEM:
                Object.keys(action.payload).forEach(key=>{
                    state[key] = action.payload[key];
                })
                //console.log(Object.keys(state)+"\n"+Object.values(state))
                return {
                            ...state
                }
            break;
        case CurrentLocationActions.CLEAR_LOCATION:
            return{
                placeId: null,
                latitude: null,
                longitude: null
            }
        break;
    default:
        return state;
        }
}