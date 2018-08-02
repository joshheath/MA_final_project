function Reporter() {}

Reporter.prototype.compile = function (trend, toneanalysis, naturallanguage) {
  return(`LANGUAGE REPORT for ${trend}:\nTone: ${toneanalysis},\nPredominant sentiment: ${naturallanguage.sentiment}\nEmotion ratings:\n sadness: ${naturallanguage.emotions.sadness},\n joy: ${naturallanguage.emotions.joy},\n fear: ${naturallanguage.emotions.fear},\n disgust: ${naturallanguage.emotions.disgust},\n anger: ${naturallanguage.emotions.anger}\nMain concept(s): ${naturallanguage.concepts}`)
};

module.exports = Reporter;
