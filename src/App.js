import React, { Component } from 'react';
import './App.css';
import ForkBanner from './components/ForkBanner/ForkBanner';
//import PresentationsList from './components/PresentationsList/PresentationsList';
import SlidesPlayer from './containers/SlidesPlayer';

class App extends Component {
  state = {
    presentation: 'slides_1',
    presentations_list: [
      {id: 'slides_1', name: 'Movie Quotations'},
      {id: 'slides_2', name: 'Slides 2'}
    ],
  }
  handlePresentationChange(presentation){
    this.setState({
      presentation
    });
  }
  render() {
    return (
      <div className="App">
        <ForkBanner url="https://github.com/AceDZN/ReactSliderPreview" />
        <div className="App-content">
          <SlidesPlayer presentation={this.state.presentation} />
          {/*<PresentationsList presentations={this.state.presentations_list} on_click={this.handlePresentationChange.bind(this)} />*/}
        </div>

      </div>
    );
  }
}

export default App;
