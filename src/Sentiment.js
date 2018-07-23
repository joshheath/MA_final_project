const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  username: process.env.TONEANALYZER_USERNAME,
  password: process.env.TONEANALYZER_PASSWORD
});


const toneParams = {
  'tone_input': { 'text': text },
  'content_type': 'application/json'
};

toneAnalyzer.tone(toneParams, function (error, analysis) {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(analysis, null, 2));
  }
}); 0;
