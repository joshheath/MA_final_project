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

// Get top 50 trends in London
function getTrends() {
  return new Promise(resolve => {
    client.get(`https://api.twitter.com/1.1/trends/place.json?id=44418`, function(err, data, response) {
      if(!err) {
        var top10Trends = []
        for(let i = 0; i < 10; i++) {
          top10Trends.push(data[0].trends[i].name)
        }
        // var joint = top10Trends.join(' ')
        // client.post('statuses/update', {status: `${joint}`}, function(error, tweet, response) {
        //   if(error) console.log(error)
        // })

        resolve(top10Trends);
      } else {
        console.log(err);
      }
    })
  })
}

function getStreams(trends) {
  return new Promise(resolve => {
    trends.forEach(function(trend) {
      const params = {
        q: `${trend}`,
        count: 10,
        result_type: 'recent',
        lang: 'en'
      }

      client.get('search/tweets', params, function(err, data, response) {
        const streamsArray = []
        if(!err){
          for(let i = 0; i < data.statuses.length; i++) {
            streamsArray.push(data.statuses[i].text)
          }
        resolve(streamsArray);
        } else {
          console.log(err);
        }
      })
    })
  })
}

function tweetReports(streamsArray) {
  return new Promise(resolve => {
    const NLAAnalyser = new NaturalLanguageUnderstanding({
      username: process.env.NLA_USERNAME,
      password: process.env.NLA_PASSWORD,
      version: '2018-03-16'
    })
    console.log(streamsArray)
    
    streamsArray.forEach(function(stream) {
      var parameters = {
        'text': stream,
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
          console.log('peep')
          // console.log(JSON.stringify(response, null, 2));
        }
      })
    })
  })

}


async function asyncCall() {
  var trends = await getTrends();
  var streams = await getStreams(trends);
  var reports = await tweetReports(streams);
  console.log(reports)
}

asyncCall();
