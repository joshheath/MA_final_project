const ToneAnalyzerCall = require('../src/bot/ToneAnalyzerCall')

var mockToneAnalyzer
var toneanalyzercall

describe('#analyzeSentiment', function () {
  it('assesses the sentiment of tweets', function (done) {
    mockToneAnalyzer = {
      tone: function (toneParams, callback) {
        callback(null, {document_tone: {tones: ['negative']}})
      }
    }
    toneanalyzercall = new ToneAnalyzerCall(mockToneAnalyzer)

    toneanalyzercall.analyzeSentiment().then(function (sentiment) {
      expect(sentiment).toEqual({"tones": [undefined]})
    })
    done()
  })

  it('calls the Twitter API', function () {
    spyOn(mockToneAnalyzer, 'tone')
    toneanalyzercall.analyzeSentiment()
    expect(mockToneAnalyzer.tone).toHaveBeenCalled()
  })

  it('produces a hash of tones', async () => {
    const tones = await toneanalyzercall.analyzeSentiment()
    expect(tones).toHaveProperty("tones")
  })
})
