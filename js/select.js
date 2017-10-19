"use strict";

var MySelect = React.createClass({
    displayName: "MySelect",

    getInitialState: function getInitialState() {
        return { value: 'move' };
    },
    _click: function _click(e) {

        console.log(e);
    },
    _onChange: function _onChange(event) {
        this.setState({ value: event.target.value });
        console.log(event.target);
    },
    render: function render() {
        return React.createElement(
            "select",
            { value: this.state.value, onClick: this._click, onChange: this._onChange },
            React.createElement(
                "option",
                { value: "stay" },
                "Should i stay"
            ),
            React.createElement(
                "option",
                { value: "move" },
                " or should i go "
            ),
            React.createElement(
                "option",
                { value: "trouble" },
                " If i stay it will be trouble "
            )
        );
    }
});

ReactDOM.render(React.createElement(MySelect, {}), document.getElementById("app"));