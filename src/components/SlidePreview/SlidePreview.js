import React from 'react';
import MediaElement from '../../containers/MediaElement/MediaElement';
import './SlidePreview.css';

const slides_preview = (props) => {
  let mediaElements = null;

  if(props.slide && props.slide.elements){
    mediaElements = props.slide.elements.map((element)=>{
      return <MediaElement is_playing={props.is_playing} currentTime={props.currentTime} slideStart={props.slide.startTime} key={element.id} {...element} />
    });
  }
  return(
    <div className="SlidePreviewContainer">
      <div className="SlidePreview">
        {mediaElements}
      </div>
    </div>
  )

}

export default slides_preview;