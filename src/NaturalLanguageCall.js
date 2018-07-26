const NaturalLanguageUnderstanding = require('watson-developer-cloud/natural-language-understanding/v1');
require('dotenv').config()

function NaturalLanguageCall(analyzer = new NaturalLanguageUnderstanding({
  username: process.env.NLA_USERNAME,
  password: process.env.NLA_PASSWORD,
  version: '2018-03-16'
})) {
  this._analyzer = analyzer;
}

// This function takes a tweet/stream as argument and returns a hash with keys for dominant 'sentiment', 'emotions' and 'concepts'.
NaturalLanguageCall.prototype.analyzeLanguage = function (tweets) {
  var parameters = {
    'text': tweets,
    'features': {
      'concepts': {},
      'emotion': {},
      'sentiment': {},
    }
  }

  this._analyzer.analyze(parameters, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      const sentiment = response.sentiment.document.label;
      const emotions = response.emotion.document.emotion;
      const concepts = []
      response.concepts.forEach(concept => { concepts.push(concept.text) });
      const report = {};
      report['sentiment'] = sentiment;
      report['emotions'] = emotions;
      report['concepts'] = concepts;
      console.log(report);
      return report;
    }
  });
};

module.exports = NaturalLanguageCall;
