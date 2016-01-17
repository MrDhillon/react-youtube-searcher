import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC6p8q8Lj_dE56KARa2Cs7J0UfUtgDr7u4';

// create new component. This should produce html

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('starwars');

  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      // this.state({videos: videos});
    });
  }

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)},300)
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={video => this.setState({selectedVideo: video})}
          videos={this.state.videos} />
      </div>
    );
  }
}

// Take this generated html and put it in the DOM

ReactDOM.render(<App />, document.querySelector('.container'));
