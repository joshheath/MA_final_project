import React, { Component } from 'react';
import './App.css';
import Hashtag from './components/hashtag.jsx';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const data = [
  {quarter: 1, earnings: 100},
  {quarter: 2, earnings: 100},
  {quarter: 3, earnings: 100},
  {quarter: 4, earnings: 100}
];

class App extends Component {
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
        tickValues={[1, 2, 3, 4]}
        tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
        dependentAxis
        tickFormat={(x) => (`${x / 100}`)}
        />
            <VictoryBar
            data={data}
            x="quarter"
            y="earnings" />
            </VictoryChart>
            </div>
        </div>
      </div>
    )
  }
}

export default App
