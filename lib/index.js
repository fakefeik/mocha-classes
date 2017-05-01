'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isFunction = require('./is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _bddDecorators = require('./bdd-decorators');

var _getInheritedProps = require('./get-inherited-props');

var _getInheritedProps2 = _interopRequireDefault(_getInheritedProps);

exports.runTest = runTest;
exports.bdd = _bddDecorators.decorators;

function runTest(suite) {
    var proto = Object.getPrototypeOf(suite);
    var suiteName = proto.constructor.suiteName;
    var annotations = getAnnotatedValues(proto);

    var beforeFunc = annotations.beforeFunc;
    var beforeEachFunc = annotations.beforeEachFunc;
    var afterFunc = annotations.afterFunc;
    var testName = annotations.testName;
    var skippedName = annotations.skippedName;

    describe(suiteName, function () {
        beforeFunc.forEach(function (beforeHook) {
            return before(beforeHook.bind(suite));
        });
        beforeEachFunc.forEach(function (beforeEachHook) {
            return beforeEach(beforeEachHook.bind(suite));
        });
        afterFunc.forEach(function (afterHook) {
            return after(afterHook.bind(suite));
        });
        testName.forEach(function (test) {
            return it(test.testName, test.bind(suite));
        });
        skippedName.forEach(function (skipped) {
            return it.skip(skipped.skippedName, skipped.bind(suite));
        });
    });
}

function getAnnotatedValues(suite) {
    var props = (0, _getInheritedProps2['default'])(suite);
    var suiteData = getEmptyAnnotations();

    props.forEach(function (prop) {
        var method = suite[prop];
        if (!(0, _isFunction2['default'])(method)) return;

        var methodProps = Object.keys(method);
        methodProps.forEach(function (prop) {
            var hasAnnote = annotations.includes(prop);
            if (hasAnnote) suiteData[prop].push(method);
        });
    });

    return suiteData;
}

var annotations = Object.keys(_bddDecorators.annotations).map(function (key) {
    return _bddDecorators.annotations[key];
});

function getEmptyAnnotations() {
    return annotations.reduce(function (collection, annotationType) {
        collection[annotationType] = [];
        return collection;
    }, {});
}