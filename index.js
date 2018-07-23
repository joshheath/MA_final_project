const Twitter = require('twitter');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const NaturalLanguageUnderstanding = require('watson-developer-cloud/natural-language-understanding/v1');

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

var my_arr = []

var trendParams = {
  count: 10
}

// Get top 50 trends in London
client.get(`https://api.twitter.com/1.1/trends/place.json?id=44418`, trendParams, function(err, data, response) {
  if(!err) {
    var top10Trends = []
    for(let i = 0; i < data[0].trends.length; i++) {
      top10Trends.push(data[0].trends[i].name)
    }
    var joint = top10Trends.join(' ')
    console.log(joint.length)
    client.post('statuses/update', {status: 'hello'})
  } else {
    console.log(err);
  }
})


client.get('search/tweets', params, function(err, data, response) {
  if(!err){
    for(let i = 0; i < data.statuses.length; i++) {
      my_arr.push(data.statuses[i].text)
    }
  } else {
    console.log(err);
  }


  var joined_arr = my_arr.join(' ')
  
  const NLAAnalyser = new NaturalLanguageUnderstanding({
    username: process.env.NLA_USERNAME,
    password: process.env.NLA_PASSWORD,
    version: '2018-03-16'
  })
  
  var parameters = {
    'text': joined_arr,
    'features': {
      'concepts': {},
      'emotion': {},
      'sentiment': {},
    }
  }
  
  NLAAnalyser.analyze(parameters, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  })
})