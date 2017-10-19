"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logging = (function () {
    function Logging() {
        _classCallCheck(this, Logging);
    }

    _createClass(Logging, [{
        key: "log",
        value: function log(event) {
            console.log(event.target.value);
            console.log(event.target.defaultValue);
        }
    }]);

    return Logging;
})();

React.render(React.createElement("textarea", { defaultValue: "hello/nworld", onChange: Logging.log }), document.getElementById('app1'));

React.render(React.createElement("textarea", { defaultValue: "hello\nworld", onChange: Logging.log }), document.getElementById('app2'));

React.render(React.createElement(
    "textarea",
    { onChange: Logging.log },
    " hello world"
), document.getElementById('app3'));

React.render(React.createElement(
    "textarea",
    { onChange: Logging.log },
    "hello\n\world"
), document.getElementById('app4'));