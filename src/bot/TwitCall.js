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
    this._client.get(`https://api.twitter.com/1.1/trends/place.json?id=${location}`, function(err, data, response) {
     if(!err) {
       // console.log(data[0].trends[0].name)
       var top10Trends = []
       for(let i = 0; i < 10; i++) {
         top10Trends.push(data[0].trends[i].name)
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
      count: 10,
      lang: 'en'
    }
    const trendHash = {trend: "", tweets: []}
    this._client.get('search/tweets', params, function(err, data, response) {
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
      resolve(tweet)
    });
  });
};

module.exports = TwitCall;
