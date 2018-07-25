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

class ApiClient {
  get(url, callback) {
    return client(url, callback);
  }
}


// Get top 50 trends in London
function getTrends() {
  return new Promise(resolve => {
    ApiClient.get(`https://api.twitter.com/1.1/trends/place.json?id=44418`, function(err, data, response) {
      if(!err) {
        var top10Trends = []
        for(let i = 0; i < 10; i++) {
          top10Trends.push(data[0].trends[i].name)
        }
        console.log(top10Trends)
        resolve(top10Trends);
      } else {
        console.log(err);
      }
    })
  })
}



function getStreams(trends) {
  return new Promise(resolve => {
    const arrayofStreams = []
    trends.forEach(function(trend) {
      getTweets(trend).then(function(fulfilled) {
        arrayofStreams.push(fulfilled)
      })
    })
    resolve(arrayofStreams)
  })
}

var getTweets = function(trend) {
  return new Promise(function(resolve) {
    const params = {
      q: `${trend}`,
      count: 10,
      lang: 'en'
    }
    const trendHash = {trend: "", tweets: []}
    client.get('search/tweets', params, function(err, data, response) {
      trendHash.trend = trend;
      if (!err) {
        data.statuses.forEach(function(tweet) {
          trendHash.tweets.push(tweet.text)
        })
      } else {
        console.log(err)
      }
      resolve(trendHash);
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
          console.log(data)
          for(let i = 0; i < data.statuses.length; i++) {
            streamsArray.push(data.statuses[i].text)
          }
        streamsArray.forEach(function(stream) {
          var analytics = []
          var parameters = {
            'text': stream,
            'features': {
              'concepts': {},
              'emotion': {},
              'sentiment': {},
            }
          }
          const NLAAnalyser = new NaturalLanguageUnderstanding({
            username: process.env.NLA_USERNAME,
            password: process.env.NLA_PASSWORD,
            version: '2018-03-16'
          })
          NLAAnalyser.analyze(parameters, function(error, response) {
            if (error) {
              console.log(error);
            } else {
              analytics.push(JSON.stringify(response, null, 2));
            }
            resolve(analytics);
          })
        })
        } else {
          console.log(err);
        }
      })
    })
  })
}


async function asyncCall() {
  var trends = await getTrends();
  var tweets = await getStreams(trends);
  // console.log(analytics)
}

asyncCall();
