var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import Header from './Header.js';
import Body from './Body.js';
import SearchHeader from './SearchHeader.js';
import CurrentLocationManager, { initialState } from './CurrentLocationManager.js';
import CurrentLocationReducer from './CurrentLocationReducer.js';

function App() {
    var _React$useState = React.useState({
        visibility: 'none',
        infoMsg: null
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        infoMsg = _React$useState2[0],
        setInfoMsg = _React$useState2[1];

    var infoMsgCloseHandler = function infoMsgCloseHandler(e) {
        setInfoMsg({
            visibility: 'none',
            infoMsg: null
        });
    };

    return React.createElement(
        'div',
        { className: 'main-container grid' },
        React.createElement(
            CurrentLocationManager,
            { initialState: initialState, reducer: CurrentLocationReducer },
            React.createElement(Header, { setInfoMsg: setInfoMsg }),
            React.createElement(SearchHeader, null),
            React.createElement(Body, { setInfoMsg: setInfoMsg })
        ),
        React.createElement(
            'div',
            { className: 'overlay main-info-overlay', style: { display: infoMsg.visibility } },
            React.createElement(
                'div',
                { className: 'modal main-info-modal flex flex-column' },
                React.createElement(
                    'span',
                    { className: 'main-info-modal-message flex flex-row' },
                    React.createElement(
                        'span',
                        { className: 'material-icons' },
                        'report_problem'
                    ),
                    '  ',
                    infoMsg.infoMsg
                ),
                React.createElement(
                    'span',
                    { className: 'main-info-modal-cta' },
                    React.createElement(
                        'button',
                        { className: 'info-msg-close', onClick: infoMsgCloseHandler },
                        'OK'
                    )
                )
            )
        )
    );
}
ReactDOM.render(React.createElement(App, null), document.getElementById("container"));

/*
      *  axios.get("http://localhost:8084/basement-finder/search",{
    params: {
        action: "searchByQuery",
        query: e.target.value
    }
}).then(response => {
        let basements = response.data;
       
        
});
<Header />
    <Body />
      */