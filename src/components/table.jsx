import React, { Component } from 'react'
import ReactTable from "react-table"
import 'react-table/react-table.css'
import TwitCall from '../TwitCall.js'
import NaturalLanguageCall from '../NaturalLanguageCall.js'


const twitcall = new TwitCall()
const nlc = new NaturalLanguageCall();

const columns = [
  {Header: 'Trend', accessor: 'trend'},
  {Header: 'Volume', accessor: 'volume', Cell: props => <span className='number'>{props.value}</span>},
  {Header: 'Sentiment', accessor: 'sentiment'},
  {Header: 'Concepts', accessor: 'concepts'}
]

class Table extends Component {

  render () {
  return (
    <div className="Table">
    <h2>Top 10 Twitter Trends</h2>
    <ReactTable
     data={this.props.data2}
     columns={columns}
     showPagination={false}
     defaultPageSize={10}
     sortable={true}
     width={35}

     getTdProps={(state, rowInfo, column, instance) => {
       return {
        onClick: (e, handleOriginal) => {
          const nameOfTrend = rowInfo.original.trend
          this.myInput
          if (handleOriginal) {
            handleOriginal();
          }
        }
      };
    }}
    /></div>
  )}
}

export default Table
