var fs = require('fs');
var _ = require('underscore');

var knedlikIpsum = {
    generate: function(ipsumConsumer) {
        var self = this;

        fs.readFile('./app/words.json', 'utf8', function (err, data) {
            if (err) throw err;

            var words = JSON.parse(data);
            var result = {
                paragraphCount: 4,
                paragraphSentences: 20,
                paragraphs: [
                    self.createPragraph(20, words),
                    self.createPragraph(20, words),
                    self.createPragraph(20, words),
                    self.createPragraph(20, words)
                ]
            };
            ipsumConsumer(result);
        });
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

    createPragraph: function(sentenceCount, words) {
        var paragraph = [];
        for (var i = 0; i < sentenceCount; i++) {
            paragraph.push(this.createSentence(words));
        }
        return paragraph;
    },

    randomWord: function(words) {
        return words[Math.floor(Math.random() * words.length)];
    },

    capitalizeFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

};

module.exports.knedlikIpsum = knedlikIpsum;