const Reporter = require('../src/bot/Reporter')

describe('Reporter', function() {

  describe('#compile', function() {
    it('compiles a language report given language analysis data', function() {

      var trend = "#Ibiza"
      var toneanalysis = "positive"
      var naturallanguage = {sentiment: 'positive', emotions: {sadness: 1, joy: 2, fear: 3, disgust: 4, anger: 5}, concepts: ['Holidays']}

      var reporter = new Reporter();

      expect(reporter.compile(trend, toneanalysis, naturallanguage)).toEqual("LANGUAGE REPORT for #Ibiza:\nTone: positive,\nPredominant sentiment: positive\nEmotion ratings:\nsadness: 1,\njoy: 2,\nfear: 3,\ndisgust: 4,\nanger: 5\nMain concept(s): Holidays")

    })
  })
})
