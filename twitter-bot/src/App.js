import React, { Component } from 'react'
import './App.css'
import Hashtag from './components/hashtag.jsx'

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
      </div>
    )
  }
}

export default App
