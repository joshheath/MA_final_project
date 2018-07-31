import React, { Component } from 'react';
import './App.css';
import Hashtag from './components/hashtag.jsx';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import NaturalLanguageCall from './NaturalLanguageCall.js'

const nlc = new NaturalLanguageCall();



const data = [
  {emotion: 1, index: 0.1},
  {emotion: 2, index: 0.2},
  {emotion: 3, index: 0.6},
  {emotion: 4, index: 0.4},
  {emotion: 5, index: 0.3}
];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      componentData: null
    }
  }
  componentDidMount() {
    nlc.analyzeLanguage("nice one mate").then((data) => {
      let componentData = data.emotions;
      this.setState(componentData);
    });
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <Hashtag hashtags={['matt', 'wareing']}/>
        </div>
        <div>
        <div>
        <VictoryChart
        domainPadding={20}
        >
        <VictoryAxis
        tickValues={[1,2,3,4,5]}
        tickFormat={["Sadness", "Joy", "Fear", "Disgust", "Anger"]}
        />
        <VictoryAxis
        dependentAxis
        tickFormat={(x) => (`${x / 1}`)}
        />
            <VictoryBar
            data={data}
            x="emotion"
            y="index" />
            </VictoryChart>
            </div>
        </div>
      </div>
    )
  }
}

export default App
