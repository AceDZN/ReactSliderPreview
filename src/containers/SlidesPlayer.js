import React, {Component} from 'react';
import axios from 'axios';

import ControlBar from '../components/ControlBar';
import SlidePreview from './SlidePreview';

class SlidesPlayer extends Component {
  state = {
    is_playing: false,
    currentSlideIdx: 0,
    last_scene_ts: 0,
    slides: [],
    player_total_duration: 0
  }

  componentDidMount(){
    axios.get('../assets/slides.json').then((res)=>{
      const playerTotalDuration = res.data.slides.reduce((current_sum, slide) => current_sum + slide.totalDuration, 0);
      let last_scene_ts = 0;
      const slides = res.data.slides.map((slide)=>{
        let c_slide = {...slide };
        c_slide.startTime = last_scene_ts;
        last_scene_ts = last_scene_ts + slide.totalDuration;

        return c_slide;
      });
      this.setState({
        slides: slides,
        currentSlideIdx: 0,
        is_playing: true,
        preview_tick: 0,
        player_total_duration: playerTotalDuration
      });
      this.startPreviewTimer();
      //console.log('response', res);
    }).catch((except)=>{
      //console.log('except, ', except);
    });
  }

  startPreviewTimer() {
    this.preview_timer = setInterval(()=>{
      if(!!this.state.is_playing){
        const current_slide = this.state.slides[this.state.currentSlideIdx];
        this.setState((prevState)=>{
          const tick = Number(prevState.preview_tick)+100;
          if(tick < (current_slide.totalDuration + prevState.last_scene_ts)){
            return {
              preview_tick: tick
            }
          } else {
            const next_index = prevState.currentSlideIdx + 1;
            const next_slide = (next_index < this.state.slides.length ? next_index : 0);
            return {
              currentSlideIdx: next_slide,
              preview_tick: (next_slide === 0 ? 0 : tick),
              last_scene_ts : (next_slide === 0 ? 0 : tick),
            }
          }
        })
      }
    }, 100);
  }

  stopPreviewTimer(){
    clearInterval(this.preview_timer);
  }
  playSlides() {
    this.setState({
      is_playing: true,
    });
    this.startPreviewTimer();
  }

  pauseSlides() {
    clearInterval(this.preview_timer);
    this.setState({
      is_playing: false,
    });
  }

  seekTo(e) {
    //clearInterval(this.preview_timer);
    if(e && e.target){
      const next_tick = e.target.value;
      const index = this.state.slides.findIndex((x) => (next_tick >= Number(x.startTime) && next_tick <= (Number(x.startTime) + Number(x.totalDuration))));
      this.setState({
        preview_tick: next_tick,
        currentSlideIdx: index || 0
      });
    }

  }




  render() {
    let current_slide = null;
    if(this.state.slides.length > 0){
      current_slide = this.state.slides[this.state.currentSlideIdx];
    }

    return(
      <div className="SlidesPlayer">
        <SlidePreview slide={current_slide} is_playing={this.state.is_playing} />
        <ControlBar
          play={this.playSlides.bind(this)} seek={this.seekTo.bind(this)} pause={this.pauseSlides.bind(this)}
          is_playing={this.state.is_playing}
          current={this.state.preview_tick} duration={this.state.player_total_duration}
          />
      </div>
    )
  }


}
export default SlidesPlayer