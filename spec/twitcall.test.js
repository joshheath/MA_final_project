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

    it('returns tweets in an array', function(done){
      twitcall.getTrends().then(function(pData) {
        expect(pData[0]).toEqual("#wednesdaywisdom")
      });
      done();
    });

  describe("#getTweets", function() {
    it('it calls the twitter API', function(done) {
      twitcall.getTweets().then(function(pData){
        expect(pData[0]).toEqual("#wednesdaywisdom")
      });
      done();
    });

    it('calls the Twitter API', function() {
      spyOn(mockTwitter, 'get')
      twitcall.getTweets();
      expect(mockTwitter.get).toHaveBeenCalled();
    });  
  })
});
