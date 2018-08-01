import React, { Component } from 'react'
import ReactTable from "react-table"
import 'react-table/react-table.css'
import TwitCall from '../TwitCall.js'

const twitcall = new TwitCall()

var trends = await twitcall.getTrends(1)
console.log(trends)

const columns = [
  {Header: 'Trend', accessor: 'trend'},
  {Header: 'Volume', accessor: 'volume', Cell: props => <span className='number'>{props.value}</span>},
  {Header: 'Sentiment', accessor: 'sentiment'},
  {Header: 'Concepts', accessor: 'concepts'}
]

class Table extends Component {
  render () {
  return (
    <ReactTable
     data={data2}
     columns={columns}
     showPagination={false}
     defaultPageSize={10}
     sortable={true}
     width={15}

     getTdProps={(state, rowInfo, column, instance) => {
       return {
        onClick: (e, handleOriginal) => {
          console.log("It was in this column:", column);
          console.log("It was in this row:", rowInfo);

          // IMPORTANT! React-Table uses onClick internally to trigger
          // events like expanding SubComponents and pivots.
          // By default a custom 'onClick' handler will override this functionality.
          // If you want to fire the original onClick handler, call the
          // 'handleOriginal' function.
          if (handleOriginal) {
            handleOriginal();
          }
        }
      };
    }}
    />
  )}
}

export default Table
