import React, { Component } from 'react'
import './App.css'
import Hashtag from './components/hashtag.jsx'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'
import NaturalLanguageCall from './NaturalLanguageCall.js'
import TwitCall from './TwitCall.js'
import Table from './components/table.jsx'

const nlc = new NaturalLanguageCall();
const twitcall = new TwitCall()

const columns = [
  {Header: 'Trend', accessor: 'trend'},
  {Header: 'Volume', accessor: 'volume', Cell: props => <span className='number'>{props.value}</span>},
  {Header: 'Sentiment', accessor: 'sentiment'},
  {Header: 'Concepts', accessor: 'concepts'}
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emotionData: [],
      sentimentData: "",
      conceptData: [],
      data2: [],
    }
  }

  myCallback = (dataFromTable) => {
    this.componentDidMount(dataFromTable)
    console.log(dataFromTable)
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
        let sentimentData = data.sentiment;
        let conceptData = data.concepts;
        let emotionData = [{emotion: 1, index: apiData.sadness}, {emotion: 2, index: apiData.fear}, {emotion: 3, index: apiData.anger}, {emotion: 4, index: apiData.disgust}, {emotion: 5, index: apiData.joy}]
        this.setState({emotionData: emotionData});
        this.setState({sentimentData: sentimentData});
        this.setState({conceptData: conceptData});
      });
      twitcall.getTrends(1).then((trends) => {
        this.setState({data2: trends})
      })
    })
  }

  render () {
    return (
      <div className="App">
        <div className="Header">
        <h1>SentimentAlyzer</h1>

        </div>
        <div className="searchbar">
        <form className="search-tweets" onSubmit={this.getData}>
            <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Trend"
            />
            <button type="submit">Analyze</button>
        </form>
        </div>
        <Table
          data2={this.state.data2}
          callbackFromApp={this.myCallback}
        />
        <Graph
          emotionData={this.state.emotionData}
        />
        <div className="Sentiment">
        <p>{this.state.sentimentData}</p>
        </div>
        <div className="Concepts">
        <p>{this.state.conceptData}</p>
        </div>
      </div>
    )
  }
}

class Graph extends Component {
  render () {
    return (
      <div className="Graph">
        <div>
        <VictoryChart height={400} width={400} domain={{y: [0, 1]}}
        domainPadding={20}
        >
        <VictoryAxis
        tickValues={[1, 2, 3, 4, 5]}
        tickFormat={["Sadness", "Fear", "Anger", "Disgust", "Joy"]}
        />
        <VictoryAxis
        dependentAxis
        // tickFormat={(x) => (`${x / 1}`)}
        />
            <VictoryBar
            barRatio={0.8}
            data={this.props.emotionData}
            x="emotion"
            y="index"
            style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 1 }}}
             />
            </VictoryChart>
        </div>
      </div>
    )
  }
}

export default App
