import React from 'react';
import './PresentationsList.css';

const presentations_list = (props)=>{
  let pList = null;
  if(props.presentations){
    const presentations = props.presentations.map((presentation)=>{
      return (
        <li className="PresentationItem" key={presentation.id} onClick={()=>{props.on_click(presentation.id)}} >
          {presentation.name}
        </li>
      )
    })
    return (
      <ul className="PresentationList">
        { presentations }
      </ul>
    );
  }

  return pList
}

export default presentations_list;