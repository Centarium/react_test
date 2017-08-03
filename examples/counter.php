<html>
<head>
    <script src="https://fb.me/react-with-addons-0.14.7.min.js"></script>
    <script src="https://fb.me/react-dom-0.14.7.min.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>JS Bin</title>
</head>
<body>
<div id="button"></div>
</body>
</html>

<script>
    class Button extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                count: this.props.start
            }
        }

        increment() {
            this.setState({
                count: this.state.count + 1
            })
        }
        render() {
            return (
                React.createElement("button", {onClick: this.increment.bind(this), className: "button"},
                    "Button was clicked ", this.state.count, " times"
                )
            );
        }
    }

    ReactDOM.render(React.createElement(Button, {start: 10}), document.getElementById('button'));

</script>