var MySelect = React.createClass({
    getInitialState: function () {
        return {value:'move'}
    },
    _click : function (e) {

        console.log(e);

    },
    _onChange : function (event) {
        this.setState({value: event.target.value});
        console.log(event.target);
    },
    render : function () {
        return (
            <select value={this.state.value} onClick={this._click} onChange={this._onChange}>

                <option value="stay" >Should i stay</option>
                <option value="move" > or should i go </option>
                <option value="trouble" > If i stay it will be trouble </option>

            </select>
        )
    }
});


ReactDOM.render(React.createElement(MySelect, {}), document.getElementById("app"));