'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Button = (function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button(props) {
        _classCallCheck(this, Button);

        _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).call(this, props);
    }

    _createClass(Button, [{
        key: 'render',
        value: function render(props) {
            var cssclasses = (0, _classnames2['default'])('Button', props.className);
            return props.href ? React.createElement('a', _extends({}, props, { className: cssclasses })) : React.createElement('button', _extends({}, props, { className: cssclasses }));
        }
    }]);

    return Button;
})(React.Component);

Button.propTypes = {
    href: React.PropTypes.string
};

ReactDOM.render(React.createElement(
    'div',
    { style: { padding: '20px' } },
    React.createElement(
        'h1',
        null,
        'Component discoverer'
    ),
    React.createElement(
        'h2',
        null,
        'Logo'
    ),
    React.createElement(
        'div',
        { style: { display: 'inline-block', background: 'purple' } },
        React.createElement(Logo, null)
    ),
    React.createElement(
        'h2',
        null,
        'Buttons'
    ),
    React.createElement(
        'div',
        null,
        'Button with onClick:',
        React.createElement(
            Button,
            { onClick: function () {
                    return alert('ouch');
                } },
            'Click me '
        )
    ),
    React.createElement(
        'div',
        null,
        'A link: ',
        React.createElement(
            Button,
            { href: 'http://reactjs.com' },
            'Follow me'
        )
    ),
    React.createElement(
        'div',
        null,
        'Custom class name: ',
        React.createElement(
            Button,
            { className: 'custom' },
            'I do nothing'
        )
    )
), document.getElementById('pad'));