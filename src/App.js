import React, { Component } from 'react';
import './App.css';
import Hashtag from './components/hashtag.jsx';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import * as NaturalLanguageCall from './NaturalLanguageCall';

const data = [
  {emotions: 1, index: 100},
  {emotions: 2, index: 100},
  {emotions: 3, index: 100},
  {emotions: 4, index: 100},
  {emotions: 5, index: 100}
];

class App extends Component {
  render () {
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
            data={data}
            x="emotions"
            y="index" />
            </VictoryChart>
            </div>
        </div>
      </div>
    )
  }
}

export default App
