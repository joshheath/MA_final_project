import React, { Component } from 'react'
import './App.css'
import Hashtag from './components/hashtag.jsx'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'
import NaturalLanguageCall from './NaturalLanguageCall.js'
import TwitCall from './TwitCall.js'
import Table from './components/table.jsx'

const nlc = new NaturalLanguageCall();
const twitcall = new TwitCall()

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
      emotionData: []
    }
  }
  myInput = React.createRef()
  getData = event => {

      event.preventDefault();
      const trend = this.myInput.current.value
      this.componentDidMount(trend)
  }

  componentDidMount(trend) {
      twitcall.getTweets(trend).then((tweets) => {
          nlc.analyzeLanguage(tweets.tweets.join(' ')).then((data) => {
            let apiData = data.emotions;
            console.log(apiData)
            let emotionData = [{emotion: 1, index: apiData.sadness}, {emotion: 2, index: apiData.fear}, {emotion: 3, index: apiData.anger}, {emotion: 4, index: apiData.disgust}, {emotion: 5, index: apiData.joy}]
            this.setState({emotionData: emotionData});
          console.log(emotionData)
          });
      })
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
          <Table />
          <Graph
            emotionData={this.state.emotionData}
          />
        </div>
      )
    }
  }


class Graph extends Component {
  render () {
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
