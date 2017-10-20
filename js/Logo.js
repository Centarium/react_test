'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

/**
 * Тоже, что
 * import React from 'react';
    const PropTypes = React.PropTypes;
 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/*class Button extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render(props)
    {
        const cssclasses = classNames('Button',props.className);
        return props.href
            ? <a {...props} className={cssclasses} />
            : <button {...props} className={cssclasses} />;
    }
}*/

var Logo = (function (_React$Component) {
    _inherits(Logo, _React$Component);

    function Logo() {
        _classCallCheck(this, Logo);

        _get(Object.getPrototypeOf(Logo.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Logo, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement('div', { className: 'Logo' });;
        }
    }]);

    return Logo;
})(_react2['default'].Component);

;function Button(props) {
    var cssclasses = (0, _classnames2['default'])('Button', props.className);
    return props.href ? _react2['default'].createElement('a', _extends({}, props, { className: cssclasses })) : _react2['default'].createElement('button', _extends({}, props, { className: cssclasses }));
}

Button.propTypes = {
    href: _react2['default'].PropTypes.string
};

ReactDOM.render(_react2['default'].createElement(
    'div',
    { style: { padding: '20px' } },
    _react2['default'].createElement(
        'h1',
        null,
        'Component discoverer'
    ),
    _react2['default'].createElement(
        'h2',
        null,
        'Logo'
    ),
    _react2['default'].createElement(
        'div',
        { style: { display: 'inline-block', background: 'purple' } },
        _react2['default'].createElement(Logo, null)
    ),
    _react2['default'].createElement(
        'h2',
        null,
        'Buttons'
    ),
    _react2['default'].createElement(
        'div',
        null,
        'Button with onClick:',
        _react2['default'].createElement(
            Button,
            { onClick: function () {
                    return alert('ouch');
                } },
            'Click me '
        )
    ),
    _react2['default'].createElement(
        'div',
        null,
        'A link: ',
        _react2['default'].createElement(
            Button,
            { href: 'http://reactjs.com' },
            'Follow me'
        )
    ),
    _react2['default'].createElement(
        'div',
        null,
        'Custom class name: ',
        _react2['default'].createElement(
            Button,
            { className: 'custom' },
            'I do nothing'
        )
    )
), document.getElementById('pad'));;