const TwitCall = require('./TwitCall')
const ToneAnalyzerCall = require('./ToneAnalyzerCall')
const NaturalLanguageCall = require('./NaturalLanguageCall')
const Reporter = require('./Reporter')

const twitcall = new TwitCall();
const tony = new ToneAnalyzerCall();
const natural = new NaturalLanguageCall();
const reporter = new Reporter();

async function asyncCall(trend) {
  var tweets = await twitcall.getTweets(trend);
  var tone = await tony.analyzeSentiment(tweets.tweets.join(' '))
  var analysis = await natural.analyzeLanguage(tweets.tweets.join(' '));
  var report = await reporter.compile(tweets.trend, tone, analysis);
  var post = await twitcall.updateStatus(report);
}

const london = 44418;
const paris = 615702;
const newyork = 2459115;
const berlin = 638242;

const locationarray = [44418, 615702, 2459115, 638242]

locationarray.forEach(location => {

  twitcall.getTrends(location).then(trends => {
    trends.forEach(trend => {
      asyncCall(trend);
    })
  })

})
