var ipsum = require('../app/ipsum.js').knedlikIpsum;

describe('Knedlik Ipsum', function() {
    it('returns a random word', function() {
        var r = ipsum.randomWord(['foo', 'bar', 'baz']);
        console.log(r);
    });
});