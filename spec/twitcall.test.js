const TwitCall = require('../src/TwitCall')

  var mockTwitter;
  var promisedData = [{trends: [{name: "#wednesdaywisdom"},
  {name: "#wednesdaywisdom"},
  {name: "#wednesdaywisdom"},
  {name: "#wednesdaywisdom"},
  {name: "#wednesdaywisdom"},
  {name: "#wednesdaywisdom"},
  {name: "#wednesdaywisdom"},
  {name: "#wednesdaywisdom"},
  {name: "#wednesdaywisdom"},
  {name: "#wednesdaywisdom"},
]}];
  var data;

  beforeEach(()=> {
    mockTwitter = {
      get: function(url, callback) {
        callback(null, promisedData, null)
      }
    }
    twitcall = new TwitCall(mockTwitter);
  })

  describe("#getTrends", function() {
    it('calls the Twitter API', function() {
      spyOn(mockTwitter, 'get')
      twitcall.getTrends();
      expect(mockTwitter.get).toHaveBeenCalled();
    });

    it('returns tweets in an array', function(albatross){
      twitcall.getTrends().then(function(pData) {
        expect(pData[0]).toEqual("#wednesdaywisdom")
      });
    });

  describe("#getTweets", function() {
    it('gets an array of tweets', function() {
      spyOn(mockTwitter, 'get')
      twitcall.getTrends();
      expect(mockTwitter.get).toHaveBeenCalled();
    })
  })
});
