import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
// Create a new component. This component should produce HTML

const API_KEY = 'AIzaSyAqYh7JfvDKwlIU-1iALCY89h-x87Oy6NQ';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('sunmi');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos:videos,
                selectedVideo: videos[0]
             });
         });
    }

    onVideoSelect(selectedVideo) {
        this.setState({selectedVideo});
    }

    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 1000);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                onVideoSelect={video => this.onVideoSelect(video)}
                videos={this.state.videos} />
            </div>
        )
    }
}


// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App/>, document.querySelector('.container'));