import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
const Twitter = require('twitter')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
const NaturalLanguageUnderstanding = require('watson-developer-cloud/natural-language-understanding/v1')

require('dotenv').config()

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

// Get top 50 trends in London
function getTrends () {
  client.get(`https://api.twitter.com/1.1/trends/place.json?id=1&lang=en`, function (err, data, response) {
    if (!err) {
      var top10Trends = []
      for (let i = 0; i < 10; i++) {
        top10Trends.push(data[0].trends[i])
      }
      return top10Trends
    } else {
      console.log(err)
    }
  })
}

function getStreams (trends) {
  trends.forEach(function (trend) {
    const params = {
      q: `${trend}`,
      count: 10,
      result_type: 'recent',
      lang: 'en'
    }

    client.get('search/tweets', params, function (err, data, response) {
      const streamsArray = []
      if (!err) {
        for (let i = 0; i < data.statuses.length; i++) {
          streamsArray.push(data.statuses[i].text)
        }
        return streamsArray
      } else {
        console.log(err)
      }
    })
  })
}

function tweetReports (streamsArray) {
  const NLAAnalyser = new NaturalLanguageUnderstanding({
    username: process.env.NLA_USERNAME,
    password: process.env.NLA_PASSWORD,
    version: '2018-03-16'
  })

  streamsArray.forEach(function (stream) {
    var parameters = {
      'text': stream,
      'features': {
        'concepts': {},
        'emotion': {},
        'sentiment': {}
      }
    }
    NLAAnalyser.analyze(parameters, function (error, response) {
      if (error) {
        console.log(error)
      } else {
        return JSON.stringify(response, null, 2)
      }
    })
  })
}

//
// function asyncCall() {
//   var trends = getTrends();
//   var streams = getStreams(trends);
//   var reports = tweetReports(streams);
//   console.log(reports)
// }
//
// asyncCall();

// The issue is that the streamsArray
