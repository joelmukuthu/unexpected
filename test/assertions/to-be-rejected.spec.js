/*global expect*/
describe('to be rejected assertion', function () {
    var Promise = typeof weknowhow === 'undefined' ?
        require('rsvp').Promise :
        window.RSVP.Promise;

    describe('with no additional argument', function () {
        it('should succeed if the response is rejected for any reason', function () {
            return expect(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject();
                }, 0);
            }), 'to be rejected');
        });

        it('should succeed if the promise is rejected without a reason', function () {
            return expect(
                expect(new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve('happy times');
                    }, 0);
                }), 'to be rejected'),
                'to be rejected with',
                "expected Promise to be rejected\n" +
                    "  Promise unexpectedly fulfilled with 'happy times'"
            );
        });

        it('should fail if the promise is fulfilled', function () {
            return expect(
                expect(new Promise(function (resolve, reject) {
                    setTimeout(resolve, 0);
                }), 'to be rejected'),
                'to be rejected with',
                'expected Promise to be rejected\n' +
                    '  Promise unexpectedly fulfilled'
            );
        });

        it('should fail if the promise is fulfilled with a value', function () {
            return expect(
                expect(new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve('happy times');
                    }, 0);
                }), 'to be rejected'),
                'to be rejected with',
                "expected Promise to be rejected\n" +
                    "  Promise unexpectedly fulfilled with 'happy times'"
            );
        });
    });

    describe('with an additional argument', function () {
        it('should succeed if the response is rejected with a reason satisfying the argument', function () {
            return expect(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject(new Error('OMG!'));
                }, 0);
            }), 'to be rejected with', new Error('OMG!'));
        });

        it('should support matching the error message against a regular expression', function () {
            return expect(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject(new Error('OMG!'));
                }, 0);
            }), 'to be rejected with', /MG/);
        });

        it('should support matching the error message of an UnexpectedError against a regular expression', function () {
            return expect(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        expect(false, 'to be truthy');
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }), 'to be rejected with', /to be/);
        });

        it('should fail if the promise is rejected with a reason that does not satisfy the argument', function () {
            return expect(
                expect(new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        reject(new Error('OMG!'));
                    }, 1);
                }), 'to be rejected with', new Error('foobar')),
                'to be rejected with',
                "expected Promise to be rejected with Error('foobar')\n" +
                    "  expected Error('OMG!') to satisfy Error('foobar')\n" +
                    "\n" +
                    "  Error({\n" +
                    "    message: 'OMG!' // should equal 'foobar'\n" +
                    "                    // -OMG!\n" +
                    "                    // +foobar\n" +
                    "  })"
            );
        });
    });
});
