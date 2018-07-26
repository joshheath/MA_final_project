const TwitCall = require('../src/TwitCall')

  var mockTwitter;
  var promisedData = [{trends: [{name: "#wednesdaywisdom"}]}];

  describe("#getTrends", function() {
    it('calls the Twitter API', function() {
      mockTwitter = { get: function() {
                      return promisedData;
                                    } };
      twitcall = new TwitCall(mockTwitter);
      spyOn(mockTwitter, 'get')
      twitcall.getTrends();
      expect(mockTwitter.get).toHaveBeenCalled();
    });

  describe("#getTweets", function() {
    it('gets an array of tweets', function() {
      mockTwitter = { get: function() {

      }}
      twitcall = new TwitCall(mockTwitter);
      spyOn(mockTwitter, 'get')
      twitcall.getTrends();
      expect(mockTwitter.get).toHaveBeenCalled();
    })
  })

});
