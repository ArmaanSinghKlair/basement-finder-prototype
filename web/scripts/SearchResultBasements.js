import SearchResultBasement from './SearchResultBasement.js';

function SearchResultBasements(_ref) {
    var basements = _ref.basements,
        displayModal = _ref.displayModal;


    return React.createElement(
        "div",
        { className: "search-result-basements" },
        basements != null && basements.length > 0 ? basements.map(function (basement, i) {
            return React.createElement(
                "div",
                { onClick: function onClick() {
                        return displayModal(basement.placeId, basement.description, basement.price);
                    } },
                React.createElement(SearchResultBasement, { placeId: basement.placeId, price: basement.price, key: i })
            );
        }) : React.createElement(
            "div",
            { className: "center flex flex-row basements-center" },
            React.createElement(
                "span",
                { className: "material-icons" },
                "apartment"
            ),
            " ",
            React.createElement(
                "span",
                null,
                "Searches here"
            )
        )
    );
}
export default React.memo(SearchResultBasements);