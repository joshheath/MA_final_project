describe("Twitter", function() {

  var twitcall;
  var mockTwitter;

  beforeEach(function() {
    mockTwitter = { get: jasmine.createSpy('get') }
    twitcall = new TwitCall(mockTwitter);
  })

  describe("#getTrends", function() {
    it('calls the Twitter API', function() {
      twitcall.getTrends()
      expect(mockTwitter.get).toHaveBeenCalled();
    })
  })

})
