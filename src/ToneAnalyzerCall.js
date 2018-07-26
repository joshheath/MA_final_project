const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
require('dotenv').config()

function ToneAnalyzerCall(toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  username: process.env.TONEANALYZER_USERNAME,
  password: process.env.TONEANALYZER_PASSWORD
})) {
  this._toneAnalyzer = toneAnalyzer;
}

ToneAnalyzerCall.prototype.analyzeSentiment = function (text) {
  const toneParams = {
    'tone_input': { 'text': text },
    'content_type': 'application/json'
  };

  this._toneAnalyzer.tone(toneParams, function (error, analysis) {
    if (error) {
      console.log(error);
    } else {
      const tones = {tones: []}
      analysis.document_tone.tones.forEach(tone => {tones.tones.push(tone.tone_name)})
      console.log(tones);
      return tones;
    }
  }); 0;

};

const analyse = new ToneAnalyzerCall();

analyse.analyzeSentiment('A government led by Jeremy Corbyn would pose an existential threat to Jewish life in the UK, a joint editorial published by the country’s three most prominent Jewish newspapers has claimed.')
