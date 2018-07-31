import React, { Component } from 'react';
import './App.css';
import Hashtag from './components/hashtag.jsx';
import SearchBar from './components/searchbar';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import NaturalLanguageCall from './NaturalLanguageCall.js'

const nlc = new NaturalLanguageCall();


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emotionData: []
    }
  }
  myInput = React.createRef();
  getData = event => {
      // 1. Stop the form from submitting
      event.preventDefault();
      // 2. get the text from that input
      const trend = this.myInput.current.value
      // 3. send search query
      this.componentDidMount(trend)
  }
  componentDidMount(trend) {
    nlc.analyzeLanguage(trend).then((data) => {
      let apiData = data.emotions;
      let emotionData = [{emotion: 1, index: apiData.sadness}, {emotion: 2, index: apiData.fear}, {emotion: 3, index: apiData.anger}, {emotion: 4, index: apiData.disgust}, {emotion: 5, index: apiData.joy}]
      this.setState({emotionData: emotionData});
      console.log(this.state);
    });

  }

  render () {
    console.log(this.state.emotionData);
    return (
      <div className="App">
        <div className="Header">
        <h1>Our Conversation</h1>
        </div>
        <div className="searchbar">
        <form className="search-tweets" onSubmit={this.getData}>
            <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Tweet Trend"
            />
            <button type="submit">Analyse</button>
        </form>
        </div>
        <Graph
          emotionData={this.state.emotionData}
        />
      </div>
    )
  }
}

class Graph extends Component {

  render () {
    // console.log(this.state)
    return (
      <div className="Graph">

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
            data={this.props.emotionData}
            x="emotion"
            y="index" />
            </VictoryChart>
        </div>
      </div>
    )
  }
}

export default App
