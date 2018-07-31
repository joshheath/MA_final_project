import React, { Component } from 'react';
import './App.css';
import Hashtag from './components/hashtag.jsx';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import NaturalLanguageCall from './NaturalLanguageCall.js'

const nlc = new NaturalLanguageCall();

class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    nlc.analyzeLanguage("The letter was written by Zoe Carew who became incensed when she saw the “Linemen” signs – which indicate that people installing or fixing power lines are working in the area – while on her way to visit her grandparents in the city of Eastbourne.").then((data) => {
      let componentData = data.emotions;
      this.setState(componentData);
    });
  }

  render () {
    console.log(this.state)
    const analysis = [{emotion: 1, index: this.state.sadness}, {emotion: 2, index: this.state.fear}, {emotion: 3, index: this.state.anger}, {emotion: 4, index: this.state.disgust}, {emotion: 5, index: this.state.joy}]
    return (
      <div className="App">
        <p>#Arnold Schwartznegger</p>
        <div>
        <div>
        <VictoryChart
        domainPadding={20}
        >
        <VictoryAxis
        tickValues={[1, 2, 3, 4, 5]}
        tickFormat={["Sadness", "Fear", "Anger", "Disgust", "Joy"]}
        />
        <VictoryAxis
        dependentAxis
        tickFormat={(x) => (`${x / 1}`)}
        />
            <VictoryBar
            data={analysis}
            x="emotion"
            y="index" />
            </VictoryChart>
            </div>
        </div>
      </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <Graph />
      </div>
    )
  }
}



export default App
