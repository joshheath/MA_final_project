const Twitter = require('twitter');
require('dotenv').config()

function TwitCall(client = new Twitter({
  consumer_key: process.env.REACT_APP_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_SECRET
})) {
  this._client = client
}

// This function gets the top 10 trends from Twitter.
// Pass in geolocator number.
TwitCall.prototype.getTrends = function(location) {
  return new Promise((resolve, reject) => {
    this._client.get(`http://localhost:7890/1.1/trends/place.json?id=${location}&lang=en`, function(err, data, response) {
     if(!err) {

       var top10Trends = []
       for(let i = 0; i < 10; i++) {
         top10Trends.push({trend: data[0].trends[i].name,volume: data[0].trends[i].tweet_volume})
       }
       resolve(top10Trends);
     } else {
       console.log(err);
       reject(err);
     }
   })
  })
};

// This function gets the tweets associated with a given trend.
// Pass in the trend.
// It returns a hash with 'trend' and 'tweets' as keys.
TwitCall.prototype.getTweets = function(trend) {
  return new Promise((resolve, reject) => {

    const params = {
      q: `${trend}`,
      count: 100,
      lang: 'en'
    }
    const trendHash = {trend: "", tweets: []}
    this._client.get(`http://localhost:7890/1.1/search/tweets.json?q=${trend}`, params, function(err, data, response) {
      trendHash.trend = trend;
      if (!err) {
        data.statuses.forEach(function(tweet) {
          trendHash.tweets.push(tweet.text)
        })
      } else {
        console.log(err)
        reject(err)
      }
      resolve(trendHash);
    })
  })
}

// This function just posts to our bot. Pass in the tweet as argument.
TwitCall.prototype.updateStatus = function (status) {
  return new Promise((resolve, reject) => {
    this._client.post('statuses/update', {status: `${status}`},  function(error, tweet, response) {
      if(error) reject(error);
      // console.log(tweet);
      resolve(tweet)  // Tweet body.
      // console.log(response);  // Raw response object.

    });
  });
};

module.exports = TwitCall;
