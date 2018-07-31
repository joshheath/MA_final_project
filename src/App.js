import React, { Component } from 'react'
import './App.css'
import Hashtag from './components/hashtag.jsx'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'
import NaturalLanguageCall from './NaturalLanguageCall.js'
import ReactTable from "react-table"
import 'react-table/react-table.css'

const nlc = new NaturalLanguageCall();

const data = [
  {emotion: 1, index: 0.1},
  {emotion: 2, index: 0.2},
  {emotion: 3, index: 0.6},
  {emotion: 4, index: 0.4},
  {emotion: 5, index: 0.3}
];

const data2 = [ { trend: '#الاخ_الكبير_مظلوم_ومضطهد', volume: 16926 },
  { trend: '#FelizMartes', volume: 16793 },
  { trend: '#NationalAvocadoDay', volume: null },
  { trend: '#MasterChefAU', volume: null },
  { trend: '#HappyBirthdayHarryPotter', volume: 29483 },
  { trend: 'VRoid', volume: 18127 },
  { trend: 'コマンドコード', volume: 52077 },
  { trend: '스텔라', volume: 62280 },
  { trend: 'Cüneyt Çakır', volume: null },
  { trend: 'Vijay Mallya', volume: null } ]

const columns = [{
  Header: 'Trend',
  accessor: 'trend' // String-based value accessors!
}, {
  Header: 'Volume',
  accessor: 'volume',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}]


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
        <div>
          <ReactTable
           data={data2}
           columns={columns}
           showPagination={false}
           defaultPageSize={10}
           sortable={true}
          />
        </div>

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
