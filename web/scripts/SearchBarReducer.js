var SearchBarActions = {
    VISIBLE: 'searchResultsVisible',
    HIDE: 'searchResultsHide',
    SETDATA: 'setData',
    REMOVEDATA: 'removeData',
    NEWDATA: 'newData'
};

export function SearchBarReducer(state, action) {
    switch (action.type) {
        case SearchBarActions.VISIBLE:
            return Object.assign({
                visibility: 'block' }, state);
            break;
        case SearchBarActions.HIDE:
            return Object.assign({}, state, {
                visibility: 'none'
            });
            break;
        case SearchBarActions.SETDATA:
            return Object.assign({ data: action.payload }, state);
            break;
        case SearchBarActions.NEWDATA:
            return { data: action.payload, visibility: 'block' };
            break;
    }
}

export default SearchBarActions;