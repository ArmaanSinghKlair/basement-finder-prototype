function DashboardFunctionality(_ref) {
        var modalState = _ref.modalState,
            setModalState = _ref.setModalState;

        return React.createElement(
                "div",
                null,
                React.createElement("div", { className: "dashboard-functionality--overlay overlay " + modalState.className }),
                React.createElement(
                        "div",
                        { className: "dashboard-functionality modal " + modalState.className },
                        React.createElement(
                                "div",
                                { className: "dashboard-functionality-close", onClick: function onClick() {
                                                return setModalState(function (state) {
                                                        return Object.assign({}, state, { className: '' });
                                                });
                                        } },
                                React.createElement(
                                        "span",
                                        { className: "material-icons" },
                                        "disabled_by_default"
                                )
                        ),
                        modalState.currentComponent != null ? React.createElement(modalState.currentComponent, null) : null
                )
        );
}

export default React.memo(DashboardFunctionality);