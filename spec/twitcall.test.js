const TwitCall = require('../src/bot/TwitCall')

var mockTwitter
var promisedData = [{"trend": "#wednesdaywisdom", "volume": 1234},
  {name: '#wednesdaywisdom'},
  {name: '#wednesdaywisdom'},
  {name: '#wednesdaywisdom'},
  {name: '#wednesdaywisdom'},
  {name: '#wednesdaywisdom'},
  {name: '#wednesdaywisdom'},
  {name: '#wednesdaywisdom'},
  {name: '#wednesdaywisdom'},
  {name: '#wednesdaywisdom'}
]
var data
var twitcall

beforeEach(() => {
  mockTwitter = {
    get: function (url, callback) {
      callback(null, promisedData, null)
    },
    post: function (status, tweet, callback) {
      callback(null, 'tweet', null)
    }
  }
  twitcall = new TwitCall(mockTwitter)
})

describe('#getTrends', function () {
  it('calls the Twitter API', function () {
    spyOn(mockTwitter, 'get')
    twitcall.getTrends()
    expect(mockTwitter.get).toHaveBeenCalled()
  })

  it('returns tweets in an array', function (done) {
    twitcall.getTrends().then(function (pData) {
      expect(pData[0]).toEqual({"trend": "#wednesdaywisdom", "volume": 1234})
    })
    done()
  })

  describe('#getTweets', function () {
    it('processes data from returned promise', function (done) {
      twitcall.getTweets().then(function (pData) {
        expect(pData[0]).toEqual('#wednesdaywisdom')
      })
      done()
    })

    it('resolves as an array of tweets', async () => {
      const trendhash = await twitcall.getTweets("dummy");
      expect(trendhash).toHaveProperty('trend');
    })

    it('calls the Twitter API', function () {
      spyOn(mockTwitter, 'get')
      twitcall.getTweets()
      expect(mockTwitter.get).toHaveBeenCalled()
    })
  })

  describe('#updateStatus', function () {
    it('updates twitter status', function (done) {
      twitcall.updateStatus().then(function (tweet) {
        expect(tweet).toEqual('tweet')
      })
      done()
    })
  })
})
