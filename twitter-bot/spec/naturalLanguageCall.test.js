const NaturalLanguageCall = require('../src/NaturalLanguageCall')

var mockNaturalLanguage
var naturallanguagecall

describe('#analyze language', function () {
  it('understands the language used in tweets', function (done) {
    mockNaturalLanguage = {
      analyze: function (parameters, callback) {
        callback(null, {sentiment: 'positive'})
      }
    }
    naturallanguagecall = new NaturalLanguageCall(mockNaturalLanguage)

    naturallanguagecall.analyzeLanguage().then(function (language) {
      expect(language).toEqual({sentiment: 'positive'})
    })
    done()
  })

  it('calls the language analyzer', function () {
    spyOn(mockNaturalLanguage, 'analyze')
    naturallanguagecall.analyzeLanguage()
    expect(mockNaturalLanguage.analyze).toHaveBeenCalled()
  })
})
