import React from 'react';
import NaturalLanguageCall from '../NaturalLanguageCall.js'
import TwitCall from '../TwitCall.js'
const nlc = new NaturalLanguageCall();
const twitcall = new TwitCall()
export default class SearchBar extends React.Component {
    myInput = React.createRef();
    getData = event => {
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. get the text from that input
        const example = this.myInput.current.value
        // 3. send search query
        this.componentDidMount(example)
    }
    componentDidMount(data) {
        twitcall.getTweets(data).then((data) => {
            nlc.analyzeLanguage(data.tweets.join(' ')).then((data) => {
              let componentData = data.emotions;
              this.setState(componentData);
            console.log(componentData)
            });
        })
      }
    render() {
        return (
        <form className="search-tweets" onSubmit={this.getData}>
            <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Tweet Trend"
            />
            <button type="submit">Analyse</button>
        </form>
        )
    }
}
