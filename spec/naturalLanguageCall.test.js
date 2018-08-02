const NaturalLanguageCall = require('../src/bot/NaturalLanguageCall')

var mockNaturalLanguage
var naturallanguagecall
var mockNaturalLanguageFailure
var failingNaturalLanguageCall

describe('#analyze language', function () {
  it('understands the language used in tweets', function (done) {
    mockNaturalLanguage = {
      analyze: function (parameters, callback) {
        callback(null, {sentiment: {document: {label:"meh"}}, concepts: []})
      }
    }
    naturallanguagecall = new NaturalLanguageCall(mockNaturalLanguage)

    naturallanguagecall.analyzeLanguage().then(function (language) {
      expect(language).toEqual({"concepts": [], "emotions": {}, "sentiment": "meh"})
    })
    done()
  })

  it('calls the language analyzer', function () {
    spyOn(mockNaturalLanguage, 'analyze')
    naturallanguagecall.analyzeLanguage()
    expect(mockNaturalLanguage.analyze).toHaveBeenCalled()
  })

  it('compiles a report', async () => {
    const report = await naturallanguagecall.analyzeLanguage("dummy string of text")
    expect(report).toHaveProperty('emotions');
  })

  it('throws an error when given the wrong information', function () {
    mockNaturalLanguageFailure  = {
      analyze: function (parameters, callback) {
        callback(null, null)
      }
    }
    failingNaturalLanguageCall = new NaturalLanguageCall(mockNaturalLanguageFailure)

    expect(failingNaturalLanguageCall.analyzeLanguage("dummy string")).toThrowError;
  })
})
