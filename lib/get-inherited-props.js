"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getInheritedProps;

function getInheritedProps(_x2) {
    var _arguments = arguments;
    var _again = true;

    _function: while (_again) {
        var obj = _x2;
        _again = false;
        var props = _arguments.length <= 1 || _arguments[1] === undefined ? [] : _arguments[1];

        if (!obj) return props;

        Object.getOwnPropertyNames(obj).forEach(function (prop) {
            if (!props.includes(prop)) props.push(prop);
        });

        _arguments = [_x2 = Object.getPrototypeOf(obj), props];
        _again = true;
        props = undefined;
        continue _function;
    }
}

module.exports = exports["default"];