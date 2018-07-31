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

  componentDidMount() {
    nlc.analyzeLanguage("The Saudi ministry of defence is run by His Royal Highness Prince Mohammed bin Salman bin Abdulaziz Al Saud. The 32-year-old, known as MbS, is said to be the world’s youngest defence minister and is also the kingdom’s deputy prime minister.").then((data) => {
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
          <SearchBar />
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
      </div>
    )
  }
}

export default App
