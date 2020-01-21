import React from 'react';
import "components/InterviewerListItem.scss";
import classname from 'classnames';

export default function InterviewerListItem (props) {
  const interviewerClass = classname("interviewers__item", {
    "interviewers__item--selected" : props.selected
  })
  //const interviewerimgClass = classname("interviewers__item")

  return (
    <li 
      className={interviewerClass}
      onClick={props.setInterviewer}
      >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}