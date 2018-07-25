const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
require('dotenv').config()

function ToneAnalyzerCall(toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  username: process.env.TONEANALYZER_USERNAME,
  password: process.env.TONEANALYZER_PASSWORD
})) {
  this._toneAnalyzer = toneAnalyzer;
}

ToneAnalyzerCall.prototype.analyzeSentiment = function () {
  const toneParams = {
    'tone_input': { 'text': text },
    'content_type': 'application/json'
  };

  this._toneAnalyzer.tone(toneParams, function (error, analysis) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(analysis, null, 2));
    }
  }); 0;

};
