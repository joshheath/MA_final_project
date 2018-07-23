const Twitter = require('twitter');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
require('dotenv').config()

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var params = {
  q: '#nodejs',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}
client.get('search/tweets', params, function(err, data, response) {
  var my_arr = []
  if(!err){
    for(let i = 0; i < data.statuses.length; i++) {
      my_arr.push(data.statuses[i].text)
    }
  } else {
    console.log(err);
  }
  console.log(my_arr)
})

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  username: process.env.TONEANALYZER_USERNAME,
  password: process.env.TONEANALYZER_PASSWORD
});

const text = 'To Iranian President Rouhani: NEVER, EVER THREATEN THE UNITED STATES AGAIN OR YOU WILL SUFFER CONSEQUENCES THE LIKES OF WHICH FEW THROUGHOUT HISTORY HAVE EVER SUFFERED BEFORE. WE ARE NO LONGER A COUNTRY THAT WILL STAND FOR YOUR DEMENTED WORDS OF VIOLENCE & DEATH. BE CAUTIOUS!'

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
