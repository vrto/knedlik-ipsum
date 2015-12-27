var fs = require('fs');
var _ = require('underscore');

var knedlikIpsum = {
    generate: function(ipsumRequest) {
        var self = this;

        fs.readFile('./app/words.json', 'utf8', function (err, data) {
            if (err) throw err;

            var words = JSON.parse(data);
            var result = {
                paragraphCount: parseInt(ipsumRequest.count),
                paragraphLength: parseInt(ipsumRequest.length),
                paragraphs: self.createPragraphs(ipsumRequest.count, ipsumRequest.length, words)
            };
            ipsumRequest.done(result);
        });
    },

    createPragraphs: function(paragraphsCount, paragraphLength, words) {
        var paragraphs = [];
        for (var i = 0; i < paragraphsCount; i++) {
            paragraphs.push(this.createPragraph(paragraphLength, words));
        }
        return paragraphs;
    },

    createPragraph: function(sentenceCount, words) {
        var paragraph = [];
        for (var i = 0; i < sentenceCount; i++) {
            paragraph.push(this.createSentence(words));
        }
        return paragraph;
    },

    createSentence: function (words) {
        var self = this;
        var reasonableMinimum = 4;
        var reasonableMaximum = 7;

        var sentenceLen = Math.floor((Math.random() * reasonableMaximum) + reasonableMinimum);
        var sentence = [];
        for (var i = 0; i < sentenceLen; i++) {
            var word = self.randomWord(words);
            sentence.push(word);
        }

        var joined = sentence.join(" ");
        joined += '.';
        joined = self.capitalizeFirstLetter(joined);
        return joined;
    },

    randomWord: function(words) {
        return words[Math.floor(Math.random() * words.length)];
    },

    capitalizeFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

};

module.exports.knedlikIpsum = knedlikIpsum;