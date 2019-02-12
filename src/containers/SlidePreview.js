import React, {Component} from 'react';
import MediaElement from '../components/MediaElement';

class SlidesPreview extends Component {
  state = {
    slide_tick: 0,
  };
  componentDidMount() {
    if(!!this.props.slide && this.props.slide.id){
      this.startSceneTimer();
    }
  }
  componentWillUnmount() {
    this.stopSceneTimer();
  }
  componentDidUpdate(prevProps) {
    if (this.props.slide && prevProps.slide && this.props.slide.id !== prevProps.slide.id) {
      this.stopSceneTimer();
      this.startSceneTimer();
    }
    if(this.props.is_playing !== prevProps.is_playing){
      if (!this.props.is_playing) {
        clearInterval(this.scene_timer);
      } else {
        this.startSceneTimer();
      }
    }
  }

  render() {
    let mediaElements = null;

    if(this.props.slide && this.props.slide.elements){
      mediaElements = this.props.slide.elements.map((element)=>{
        return <MediaElement tick={this.state.slide_tick} key={element.id} {...element} />
      });
    }
    return(
      <div className="SlidePreview">
        {mediaElements}
      </div>
    )
  }

  startSceneTimer(){
    this.scene_timer = setInterval(()=>{
      if(!!this.props.is_playing){
        this.setState((prevState)=>{
          const tick = Number(prevState.slide_tick) + 100;
          return {
            slide_tick: tick
          }
        })
      }

    }, 100);
  }

  stopSceneTimer(){
    this.setState({
      slide_tick: 0
    })
    clearInterval(this.scene_timer);
  }

}

export default SlidesPreview;