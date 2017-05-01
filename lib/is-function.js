'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = isFunc;

function isFunc(val) {
    return val && Object.prototype.toString.call(val) === '[object Function]';
}

module.exports = exports['default'];