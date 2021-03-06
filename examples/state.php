<head>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
</head>

<div id="app"></div>


<script>

    var logMixin = {
        _log: function(methodName, args) {
            console.log(this.name + '::' + methodName, args);
        },
        componentWillUpdate: function() {
            this._log('componentWillUpdate', arguments);
        },
        componentDidUpdate: function() {
            this._log('componentDidUpdate', arguments);
        },
        componentWillMount: function() {
            this._log('componentWillMount', arguments);
        },
        componentDidMount: function() {
            this._log('componentDidMount', arguments);
        },
        componentWillUnmount: function() {
            this._log('componentWillUnmount', arguments);
        },
    };

    var Counter = React.createClass({
        name : 'Counter',
        mixins: [logMixin],
        propTypes : {
            count: React.PropTypes.number.isRequired,
        },
        render: function () {
            return React.DOM.span(null, this.props.count);
        }
    });

    var TextAreaCounter = React.createClass({

        name : 'TextAreaCounter',
        mixins : [logMixin],

        propTypes: {
            text: React.PropTypes.string
        },

        getDefaultProps: function () {
            return {text: ''};
        },

        render: function () {
            var counter = null;

            if(this.state.text.length > 0)
            {
                counter = React.DOM.h3(null,
                    React.createElement(Counter, {
                        count: this.state.text.length,
                    })
                )
            }

            return React.DOM.div(null,
                React.DOM.textarea({
                    value: this.state.text,
                    onChange : this._textChange
                }),
                counter
            );
        },

        _textChange : function (ev) {
            this.setState({
                text: ev.target.value,
            });
        },

        getInitialState : function()
        {
            return {
                text: this.props.text,
            };
        },

        componentWillReceiveProps: function (newProps) {
            this.setState({
                text: newProps.defaultValue,
            });
        }

    });

    ReactDOM.render(
        React.createElement(TextAreaCounter, {
            text : "Bob"
        }),
        document.getElementById('app')
    );

        //компонент = узел
    //var reactAppNode = ReactDOM.findDOMNode(TextAreaCounter);

</script>