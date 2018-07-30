const TwitCall = require('./TwitCall')
const ToneAnalyzerCall = require('./ToneAnalyzerCall')
const NaturalLanguageCall = require('./NaturalLanguageCall')
const Reporter = require('./Reporter')

const twitcall = new TwitCall();
const tony = new ToneAnalyzerCall();
const natural = new NaturalLanguageCall();
const reporter = new Reporter();

const locations = [{name: 'London', woeid: 44418}, {name: 'Paris', woeid: 615702}, {name: 'New York', woeid: 2459115}, {name: 'Berlin', woeid: 638242}]

async function asyncCall(trend) {
  var tweets = await twitcall.getTweets(trend);
  var tone = await tony.analyzeSentiment(tweets.tweets.join(' '))
  var analysis = await natural.analyzeLanguage(tweets.tweets.join(' '));
  var report = await reporter.compile(tweets.trend, tone, analysis);
  var post = await twitcall.updateStatus(report);
}

locations.forEach(location => {
  twitcall.getTrends(location.woeid).then(trends => {
    twitcall.updateStatus(`Top trending topics in ${location.name}: ${trends.join(', ')}`);
  });
});


locations.forEach(location => {
  twitcall.getTrends(location.woeid).then(trends => {
    trends.forEach(trend => {
      asyncCall(trend);
    })
  })
})
