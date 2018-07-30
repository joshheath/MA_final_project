function Reporter() {}

Reporter.prototype.compile = function (trend, toneanalysis, naturallanguage) {
  return(`LANGUAGE REPORT for ${trend}:\nTone: ${toneanalysis.tones[0]},\nPredominant sentiment: ${naturallanguage.sentiment}\nEmotion ratings:\nsadness: ${naturallanguage.emotions.sadness},\njoy: ${naturallanguage.emotions.joy},\nfear: ${naturallanguage.emotions.fear},\ndisgust: ${naturallanguage.emotions.disgust},\nanger: ${naturallanguage.emotions.anger}\nMain concept(s): ${naturallanguage.concepts[0]}, ${naturallanguage.concepts[1]}`)
};

module.exports = Reporter;
