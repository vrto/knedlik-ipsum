var fs = require('fs');
var _ = require('underscore');

function knedlikIpsum(ipsumConsumer) {
    fs.readFile('./words.json', 'utf8', function(err, data) {
        if (err) throw err;

        var words = JSON.parse(data);
        var result = {
            paragraphCount: 4,
            paragraphSentences: 20,
            paragraphs: [
                createPragraph(20, words),
                createPragraph(20, words),
                createPragraph(20, words),
                createPragraph(20, words)
            ]
        };
        ipsumConsumer(result);
    });
}

function createPragraph(sentenceCount, words) {
    var sentenceLen = Math.floor((Math.random() * 20) + 4);
    var sentence = [];
    for (var i = 0; i < sentenceLen; i++) {
        var word = randomWord(words);
        sentence.push(word);
    }

    var joined = sentence.join(" ");
    joined += '.';
    joined = capitalizeFirstLetter(joined);
    return joined;
}

function randomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.knedlikIpsum = knedlikIpsum;