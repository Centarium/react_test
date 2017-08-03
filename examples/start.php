<head>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
</head>

<div id="app"></div>
<div id="family"></div>

<script>

    let ComponentFamily = React.createClass({
        propTypes : {
            firstName  : React.PropTypes.string.isRequired,
            middleName : React.PropTypes.string,
            familyName : React.PropTypes.string.isRequired,
            address    : React.PropTypes.string
        },

        getDefaultProps : function () {
            return {
                middleName : '',
                address : 'n/a'
            };
        },

        render : function () {return React.DOM.div(null, 'Your name is '+
            this.props.firstName + ' ' + this.props.familyName + ' ' + this.props.middleName +
                ' and your address is ' + this.props.address
        );}
    });

    var Component  = React.createClass({

        propTypes : {
            name : React.PropTypes.string.isRequired
        },

        render : function () {
            return React.DOM.span(null, "I`m so custom element" + this.props.name);
        }
    });

    ReactDOM.render(
        React.createElement( Component, {name : " me"} ),
        document.getElementById('app')
    );

    ReactDOM.render(
        React.createElement( ComponentFamily, {firstName : 'John', familyName : 'Dow'} ),
        document.getElementById('family')
    );

</script>