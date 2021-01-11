const SearchBarActions = {
        VISIBLE: 'searchResultsVisible',
        HIDE: 'searchResultsHide',
        SETDATA: 'setData',
        REMOVEDATA: 'removeData',
        NEWDATA: 'newData'
}

export function SearchBarReducer(state, action){
    switch(action.type){
        case SearchBarActions.VISIBLE:
            return {
                visibility: 'block', ...state
            }
            break;
          case SearchBarActions.HIDE:
            return {
                        ...state,
                        visibility: 'none'
            }
            break;
        case SearchBarActions.SETDATA:
            return {data: action.payload, ...state};
            break;
        case SearchBarActions.NEWDATA:
            return {data:action.payload, visibility: 'block'}
            break;
    }
}



export default SearchBarActions;