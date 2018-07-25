const TwitCall = require('../src/TwitCall')

  var mockTwitter;
  var promisedData = [{trends: [{name: "#wednesdaywisdom"}]}];

  beforeEach(function() {
    mockTwitter = { get: function() {
                    return promisedData;
                                  } };
    twitcall = new TwitCall(mockTwitter);

    spyOn(mockTwitter, 'get')
  })

  describe("#getTrends", function() {
    it('calls the Twitter API', function() {
      twitcall.getTrends();
      expect(mockTwitter.get).toHaveBeenCalled();
    });
});
