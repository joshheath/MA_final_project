const NaturalLanguageUnderstanding = require('watson-developer-cloud/natural-language-understanding/v1');
require('dotenv').config()

function NaturalLanguageCall(analyzer = new NaturalLanguageUnderstanding({
  username: process.env.NLA_USERNAME,
  password: process.env.NLA_PASSWORD,
  version: '2018-03-16'
})) {
  this._analyzer = analyzer;
}


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

const nlc = new NaturalLanguageCall();

nlc.analyzeLanguage('A total of 23 people died in or after detention in 2017-18, according to official figures released by the police watchdog, up from 14 people the previous year.')
