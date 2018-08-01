function Reporter() {}

Reporter.prototype.compile = function (trend, toneanalysis, naturallanguage) {
  return(`LANGUAGE REPORT for ${trend}:\nTone: ${toneanalysis},\nPredominant sentiment: ${naturallanguage.sentiment}\nEmotion ratings:\nsadness: ${naturallanguage.emotions.sadness},\njoy: ${naturallanguage.emotions.joy},\nfear: ${naturallanguage.emotions.fear},\ndisgust: ${naturallanguage.emotions.disgust},\nanger: ${naturallanguage.emotions.anger}\nMain concept(s): ${naturallanguage.concepts}`)
};

const reporter = new Reporter();

var trend = "#Ibiza"
var toneanalysis = "positive"
var naturallanguage = {sentiment: 'neutral', emotions: {sadness: 1, joy: 2, fear: 3, disgust: 4, anger: 5}, concepts: ['Holidays']}

reporter.compile(trend, toneanalysis, naturallanguage);

module.exports = Reporter;
