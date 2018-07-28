const ToneAnalyzerCall = require('../src/ToneAnalyzerCall')

var mockToneAnalyzer
var toneanalyzercall

describe('#analyzeSentiment', function () {
  it('assesses the sentiment of tweets', function (done) {
    mockToneAnalyzer = {
      tone: function (toneParams, callback) {
        callback(null, 'negative')
      }
    }
    toneanalyzercall = new ToneAnalyzerCall(mockToneAnalyzer)

    toneanalyzercall.analyzeSentiment().then(function (sentiment) {
      expect(sentiment).toEqual({tones: ['negative']})
    })
    done()
  })

  it('calls the Twitter API', function () {
    spyOn(mockToneAnalyzer, 'tone')
    toneanalyzercall.analyzeSentiment()
    expect(mockToneAnalyzer.tone).toHaveBeenCalled()
  })
})
