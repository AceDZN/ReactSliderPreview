import React from 'react';
import SeekBar from './SeekBar';
const control_bar = (props)=>{
  let playPauseBtn = {};
  if(!!props.is_playing){
    playPauseBtn = {btnClass:"Pause", icon: "../assets/img/pause_btn.svg", on_click: props.pause}
  } else {
    playPauseBtn = {btnClass:"Play", icon: "../assets/img/play_btn.svg", on_click: props.play}
  }
  return(
    <div className="ControlBar">
      <div className={"Btn "+playPauseBtn.btnClass} onClick={playPauseBtn.on_click}>
        <img alt={playPauseBtn.btnClass} src={playPauseBtn.icon} />
      </div>
      <SeekBar duration={props.duration} seek={props.seek} tick={props.current} />
    </div>
  )
}

export default control_bar;