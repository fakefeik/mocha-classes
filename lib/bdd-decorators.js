'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function setAnnotation(annotationName, value, target, name, descriptor) {
    descriptor.value[annotationName] = value;
    return descriptor;
}

var annotes = {
    before: 'beforeFunc',
    beforeEach: 'beforeEachFunc',
    after: 'afterFunc',
    it: 'testName',
    skipped: 'skippedName',
    describe: 'suiteName'
};
exports.annotations = annotes;
var decorators = {
    before: setAnnotation.bind(null, annotes.before, true),
    beforeEach: setAnnotation.bind(null, annotes.beforeEach, true),
    after: setAnnotation.bind(null, annotes.after, true),
    it: function it(testName) {
        return setAnnotation.bind(null, annotes.it, testName);
    },
    describe: function describe(suiteName) {
        return function (suite) {
            suite[annotes.describe] = suiteName;
        };
    }
};

exports.decorators = decorators;
decorators.it.skip = function (testName) {
    return setAnnotation.bind(null, annotes.skipped, testName);
};