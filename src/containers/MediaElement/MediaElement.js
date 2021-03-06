import React, {Component} from 'react';
import './MediaElement.css';
class MediaElement extends Component {
  state = {
    element_shown: null,
  }

  componentDidMount(){
    let show_element = this.shouldElementBeShown(this.props.currentTime);
    show_element ? this.showElement() : this.hideElement();
  }

  shouldComponentUpdate(nextProps, nextState){
    let visibility_changed = (this.state.element_shown !== this.shouldElementBeShown(nextProps.currentTime));
    if(!this.state.element_shown && this.shouldElementBeShown(nextProps.currentTime)){
      visibility_changed = true;
    }
    const play_changed = (this.props.is_playing !== nextProps.is_playing );
    return visibility_changed || play_changed;
  }
  componentDidUpdate(prevProps) {
    const show_element = this.shouldElementBeShown(this.props.currentTime);
    if(this.state.element_shown !== show_element){
      show_element ? this.showElement() : this.hideElement();
    }
    if(this.props.is_playing !== prevProps.is_playing){
      if(this.props.type === "video"){
        const video_item = this.refs[`video_item_${this.props.id}`];
        !!this.props.is_playing ? video_item.play() : video_item.pause();
      }
    }
  }
  shouldElementBeShown (currentTime){
    return (
      currentTime >= (this.props.slideStart + this.props.startTime)
       && currentTime <= (this.props.slideStart + this.props.startTime + this.props.duration)
     );
  }

  showElement(){
    this.setState({ element_shown: true })
    if(this.props.type === "video"){
      const video_item = this.refs[`video_item_${this.props.id}`];
      video_item.volume = .2;
      this.props.is_playing ? video_item.play() : video_item.pause();
    }
  }
  hideElement(){
    if(this.props.type === "video"){
      const video_item = this.refs[`video_item_${this.props.id}`];
      video_item.pause();
    }
    this.setState({ element_shown: false })
  }


  render(){
    let mediaElement = null;
    if(!!this.props.id){
      let style = {...this.props.style};
      const windowWidth = window.innerWidth;
      if(windowWidth < 650 && style.fontSize){
        style.fontSize = (Number(style.fontSize.replace('px','')) / 1.5);
      }

      if(this.state.element_shown){ style.opacity = "1" } else { style.opacity = "0" }

      if(this.props.type === "image"){
        mediaElement = <img key={this.props.id} alt="" className="MediaElement Image" src={this.props.src} style={style} />
      } else if(this.props.type === "video") {
        mediaElement = <video volume="0.1" ref={`video_item_${this.props.id}`} key={this.props.id} className={`MediaElement Video ${this.props.id}`} src={this.props.src} style={style} autoPlay={true} type="video/mp4" />
      } else {
        mediaElement = <div key={this.props.id} className="MediaElement Text" style={style}>{this.props.content}</div>
      }
    }

    return mediaElement
  }

}

export default MediaElement;