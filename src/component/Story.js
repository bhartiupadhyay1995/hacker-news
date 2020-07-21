import React from "react";
import styles from '../styles/story.module.css';
var Highlight = require('react-highlighter');


export default class Story extends React.Component {

    /**
     * constructor
     *
     * @object  @props  parent props
     * @object  @state  component state
     */
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            items: [],
            isLoaded: false
        }

    }
    //To Get all stories from the api
    componentDidMount() {
        fetch('http://localhost:1234/api/getStoriesId')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true,
                })
            }).catch((err) => {
                console.log(err);
            });

    }

   //convert story post time from epoch to date
    epochToTime(epochdate) {
        var myDate = new Date(epochdate * 1000);
        const time = myDate.toGMTString();
        return time;
    }

    //get text from search box and hit search api
    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
        let selectedWord = evt.target.value;
        console.log(selectedWord)
        if (!selectedWord) {
            fetch('http://localhost:1234/api/getStoriesId')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        items: json,
                        isLoaded: true,
                    })
                }).catch((err) => {
                    console.log(err);
                });
        }
        else {
            fetch("http://localhost:1234/api/search/" + selectedWord).then(res => res.json())
                .then(json => {
                    this.setState({
                        items: json,
                        isLoaded: true,
                    })

                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        const { isLoaded, items } = this.state;
        if (!isLoaded)
            return <div>Loading...</div>;
        return (
            <div className="App">
                <div class={styles.cntr}>
                    <span class={styles.heading}>HACKER NEWS SEARCH</span> <input type="search" placeholder="Search stories by title, url or author" class={styles.SearchInput} value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
                </div>

                <div class="Story_container">{items.map(item => (
                    <div class={styles.Story_data}>
                        <Highlight search={this.state.inputValue}>{item.title}</Highlight>

                        <div class={styles.Story_title}>
                            <div><a href={item.url}><Highlight search={this.state.inputValue}>{item.url}</Highlight></a></div>
                        </div>
                        <div class={styles.Story_meta}>

                            <span>
                                <span><Highlight search={this.state.inputValue}>{item.by}</Highlight></span>
                            </span>
                            <span class="Story_separator">|
                </span><span>{this.epochToTime(item.time)}</span>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        );
    }
}
