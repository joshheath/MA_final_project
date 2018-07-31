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
  var tone = await tony.analyzeSentiment(tweets.tweets.join(' '))
  var analysis = await natural.analyzeLanguage(tweets.tweets.join(' '));
  var data = [analysis.emotions]
  console.log(data)
}

asynccall = asyncCall('zimbabwe')
