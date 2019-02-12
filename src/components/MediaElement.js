import React from 'react';

const media_element = (props)=>{
  let mediaElement = null;
  if(!!props.id){
    let style = {...props.style};
    if(props.tick >= props.startTime && props.tick <= (props.startTime + props.duration)){
      style.opacity = "1"
    } else {
      style.opacity = "0"
    }

    if(props.type === "image"){
      mediaElement = <img key={props.id} alt="" className="MediaElement Image" src={props.src} style={style} />
    } else if(props.type === "video") {
      mediaElement = <video  key={props.id} className={`MediaElement Video ${props.id}`} src={props.src} style={style} autoPlay={true} type="video/mp4" />
    } else {
      mediaElement = <div key={props.id} className="MediaElement Text" style={style}>{props.content}</div>
    }
  }

  return mediaElement
}

export default media_element;