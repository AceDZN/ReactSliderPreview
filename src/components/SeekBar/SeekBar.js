import React from 'react';
import './SeekBar.css';

const seek_bar = (props)=>{
  let seekBar = null;
  if(!!props.duration){
    if(!!props.tick){
      const progress_width = Math.floor(props.tick/props.duration*100);
      const style={width: `${progress_width}%`};
      seekBar = (
        <div className="SeekBar">
          <div className="ProgressWrap">
            <input type="range" min="0" max={props.duration} value={props.tick} className="ProgressRange" onChange={props.seek}/>
            <div className="ProgressLine" style={style}></div>
          </div>
        </div>
      )
    }
  }
  return seekBar
}

export default seek_bar;