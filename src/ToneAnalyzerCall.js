const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
require('dotenv').config()

function ToneAnalyzerCall(toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  username: process.env.REACT_APP_TONEANALYZER_USERNAME,
  password: process.env.REACT_APP_TONEANALYZER_PASSWORD
})) {
  this._toneAnalyzer = toneAnalyzer;
}

//This function gets the predominant 'tone' of a string from Watson
ToneAnalyzerCall.prototype.analyzeSentiment = function (text) {
  return new Promise((resolve, reject) => {
    const toneParams = {
      'tone_input': { 'text': text },
      'content_type': 'application/json'
    };

    this._toneAnalyzer.tone(toneParams, function (error, analysis) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        const tones = {tones: []}
        analysis.document_tone.tones.forEach(tone => {tones.tones.push(tone.tone_name)})
        // console.log(tones);
        resolve(tones);
      }
    }); 0;
  })
};
// tone = new ToneAnalyzerCall()
// tone.analyzeSentiment("NationalAvocadoDay")

module.exports = ToneAnalyzerCall;
