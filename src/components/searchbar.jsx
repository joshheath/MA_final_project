import React from 'react';

export default class SearchBar extends React.Component {
    myInput = React.createRef();
    getData = event => {
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. get the text from that input
        const example = this.myInput.current.value
        // 3. send search query
        console.log(example)
    }
    render() {
        return (
        <form className="search-tweets" onSubmit={this.getData}>
            <h2>Please Enter A Tweet To See Trends For</h2>
            <input 
            type="text" 
            ref={this.myInput}
            required 
            placeholder="Tweet Trend" 
            />
            <button type="submit">See Trends</button>
        </form>
        )
    }
}