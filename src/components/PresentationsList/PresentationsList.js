import React from 'react';
import './PresentationsList.css';

const presentations_list = (props)=>{
  let pList = null;
  if(props.presentations){
    const presentations = props.presentations.map((presentation)=>{
      return (
        <li className="PresentationItem" key={presentation.id} onClick={()=>{props.on_click(presentation.id)}} >
          <img alt={`${presentation.name} slides`} src={`http://acedzn.com/outer_resources/images/thumbs/${presentation.id}.jpg`} />
          {presentation.name}
        </li>
      )
    })
    return (
      <ul className="PresentationsList">
        { presentations }
      </ul>
    );
  }

  return pList
}

export default presentations_list;