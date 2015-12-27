var ipsum = require('../app/ipsum.js').knedlikIpsum;
var _ = require('underscore');
var request = require('request');
var server = require('../app/server.js');

describe('Knedlik Ipsum', function () {
    var words = ['foo', 'bar', 'baz'];

    it('returns a random word', function () {
        var w = ipsum.randomWord(words);
        expect(_.contains(words, w)).toBe(true);
    });

    it('creates a sentence that starts with a capital letter and ends with a dot', function () {
        var sentence = ipsum.createSentence(words);
        verifySentenceSemantics(sentence);
    });

    it('it creates a resonably sized sentence', function () {
        var sentences = [];
        for (var i = 0; i < 100; i++) {
            sentences.push(ipsum.createSentence(words));
        }

        _.each(sentences, function (sentence) {
            verifySentenceSize(sentence);
        });
    });

    it('should create paragraph consisting of specified number of sentences', function () {
        var paragraphSize = 10;
        var paragraph = ipsum.createPragraph(paragraphSize, words);

        expect(paragraph.length).toBe(paragraphSize);
        _.each(paragraph, function (sentence) {
            verifySentenceSize(sentence);
            verifySentenceSemantics(sentence);
        })
    });

    function verifySentenceSemantics(sentence) {
        expect(sentence.charAt(0)).toBe(sentence.charAt(0).toUpperCase());
        expect(sentence.charAt(sentence.length - 1)).toBe('.');
    }

    function verifySentenceSize(sentence) {

        function countWordsInSentence(sentence) {
            return sentence.split(" ").length;
        }

        // we don't count the '.' char as it is appended to the last word in sentence
        expect(countWordsInSentence(sentence)).toBeGreaterThan(3);
        expect(countWordsInSentence(sentence)).toBeLessThan(11);
    }

});

describe('Ipsum Server', function () {

    afterAll(function() {
        server.closeServer();
    });

    describe('GET /', function () {
        it('should return ipsum JSON', function(done) {
            request.get('http://localhost:5000/', function (error, response, body) {
                var ipsum = JSON.parse(body);
                expect(ipsum.paragraphCount).toBe(4);
                expect(ipsum.paragraphLength).toBe(20);
                expect(ipsum.paragraphs.length).toBe(4);
                done();
            });
        });

        it('should react to paragraphCount query parameter', function(done) {
            request.get('http://localhost:5000?paragraphCount=10', function (error, response, body) {
                var ipsum = JSON.parse(body);
                expect(ipsum.paragraphCount).toBe(10);
                expect(ipsum.paragraphs.length).toBe(10);
                done();
            });
        });

        it('should react to paragraphLength query parameter', function(done) {
            request.get('http://localhost:5000?paragraphLength=10', function (error, response, body) {
                var ipsum = JSON.parse(body);
                expect(ipsum.paragraphLength).toBe(10);
                _.each(ipsum.paragraphs, function(p) {
                    expect(p.length).toBe(10);
                });
                done();
            });
        });
    });
});