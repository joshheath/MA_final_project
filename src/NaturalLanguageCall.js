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
      console.log(JSON.stringify(response, null, 2));
    }
  });
};
