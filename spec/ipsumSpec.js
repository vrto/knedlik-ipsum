var ipsum = require('../app/ipsum.js').knedlikIpsum;
var _ = require('underscore');

describe('Knedlik Ipsum', function() {
    var words = ['foo', 'bar', 'baz'];

    it('returns a random word', function() {
        var w = ipsum.randomWord(words);
        expect(_.contains(words, w)).toBe(true);
    });

    it('creates a sentence that starts with a capital letter and ends with a dot', function() {
        var sentence = ipsum.createSentence(words);
        verifySentenceSemantics(sentence);
    });

    it('it creates a resonably sized sentence', function() {
        var sentences = [];
        for (var i = 0; i < 100; i++) {
            sentences.push(ipsum.createSentence(words));
        }

        _.each(sentences, function(sentence) {
            verifySentenceSize(sentence);
        });
    });

    it('should create paragraph consisting of specified number of sentences', function() {
        var paragraphSize = 10;
        var paragraph = ipsum.createPragraph(paragraphSize, words);

        expect(paragraph.length).toBe(paragraphSize);
        _.each(paragraph, function(sentence) {
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