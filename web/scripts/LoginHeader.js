import SearchBar from './SearchBar.js';

function LoginHeader(props) {

        return React.createElement(
                "div",
                { className: "header flex flex-row" },
                React.createElement(
                        "div",
                        { className: "logo" },
                        React.createElement(
                                "span",
                                { className: "logo--base" },
                                "BASE"
                        ),
                        React.createElement(
                                "span",
                                { className: "logo--ments" },
                                "MENTS"
                        )
                ),
                React.createElement(
                        "div",
                        { className: "flex flex-row header-not-logo" },
                        React.createElement(
                                "button",
                                { className: "login flex flex-row", onClick: function onClick() {
                                                return location.assign(ENV.PATH + "dashboard");
                                        } },
                                React.createElement(
                                        "span",
                                        { className: "material-icons search-result--result--icon" },
                                        "login"
                                ),
                                " Dashboard"
                        )
                )
        );
}

export default React.memo(LoginHeader);