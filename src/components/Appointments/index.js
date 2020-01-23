import React, { Fragment } from 'react';

import "./styles.scss";

import {useVisualMode} from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';


export default function Appointments ({  
  time,
  id,
  interview,
  interviewers,
  bookInterview
}) {

  //-------------- STATE MANAGEMENT -----------------------------------------------//
  const { mode, transition, back } = useVisualMode (interview ? SHOW : EMPTY);
  //-------------------------------------------------------------------------------//
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };console.log(id)
    bookInterview(id, interview);
    transition(SHOW);
  };
  // console.log("interview",interview)
  
  const findInterviewer = function (obj, arr) {
    if (!obj) {return {}} 
    else {
      const intId = obj.interviewer;
      const output = arr.filter(item => item.id === intId)
      return output[0];
    }
  }

  let output = findInterviewer(interview,interviewers); console.log(output)
  return (
    <article className="appointment">
      <Header time={time}/>
      {/* {(interview) ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => (transition(CREATE))}/>}
      {mode === SHOW && (
        <Show 
          student={interview.student}
          // interviewer={interview}
          interviewer={interview}
        />
      )}
       {mode === CREATE && (
         <Form 
          interviewers={interviewers} 
          onCancel={() => (back())}
          onSave={save}
        />
       )} 
    </article>
  )
}