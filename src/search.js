const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const NaturalLanguageUnderstanding = require('watson-developer-cloud/natural-language-understanding/v1');
require('dotenv').config()

const TwitCall = require('./TwitCall')
const ToneAnalyzerCall = require('./ToneAnalyzerCall')
const NaturalLanguageCall = require('./NaturalLanguageCall')

const twitcall = new TwitCall();
const tony = new ToneAnalyzerCall();
const natural = new NaturalLanguageCall();

async function asyncCall(trend) {
  var tweets = await twitcall.getTweets(trend);
  var trends = await twitcall.getTrends(1)
  var tone = await tony.analyzeSentiment(tweets.tweets.join(' '))
  var analysis = await natural.analyzeLanguage(tweets.tweets.join(' '));
  var data = [analysis.sentiment, analysis.concepts]
  console.log(data)
  console.log(trends.tweet_volume)
}
// var top10Trends = ["mugabe", "twitter", "racism"]
// var newData = []
// top10Trends.forEach(x => {
//   newData.push(asyncCall(x));
// })


async function Muthafunction() {
  var trends = await twitcall.getTrends(1)
  var tweets = trend.forEach(trend => {
    var top10Tweets = await twitcall.getTweets(trend.trend);
  })

}
