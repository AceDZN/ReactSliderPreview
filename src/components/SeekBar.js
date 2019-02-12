import React from 'react';

const seek_bar = (props)=>{
  let seekBar = null;
  if(!!props.duration){

    seekBar = props.duration
    if(!!props.tick){
      const progress_width = Math.floor(props.tick/props.duration*100);
      const style={width: `${progress_width}%`};
      seekBar = (
        <div className="ProgressWrap">
          <input type="range" min="0" max={props.duration} value={props.tick} className="ProgressRange" onChange={props.seek}/>
          <div className="ProgressLine" style={style}></div>
        </div>
      )
    }
  }
  return(
    <div className="SeekBar">
        {seekBar}

    </div>
  )
}

export default seek_bar;