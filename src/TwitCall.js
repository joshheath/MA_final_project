const Twitter = require('twitter');
require('dotenv').config()

function TwitCall(client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})) {
  this._client = client
}

TwitCall.prototype.getTrends = function () {
  return new Promise(resolve => {
    this._client.get(`https://api.twitter.com/1.1/trends/place.json?id=44418`, function(err, data, response) {
      if(!err) {
        var top10Trends = []
        for(let i = 0; i < 10; i++) {
          top10Trends.push(data[0].trends[i].name)
        }
        resolve(top10Trends);
      } else {
        console.log(err);
      }
    })
  })
};

var twitcall = new TwitCall();

twitcall.getTrends();
