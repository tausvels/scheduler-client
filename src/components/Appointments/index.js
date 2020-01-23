import React, { Fragment } from 'react';

import "./styles.scss";

import {useVisualMode} from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import STATUS from './Status';
import Status from './Status';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


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

  // ----- FUNCTION DECLARATIONS -------------------------------------------------//
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
    .then(resolve => transition(SHOW))
    .catch(e => console.error(e));
    
  };
  // console.log("interview",interview)
  
  const findInterviewer = function (obj, arr) {
    if (!obj) {return {name:""}} 
    else {
      const intId = obj.interviewer;
      const output = arr.filter(item => item.id === intId)
      return output[0];
    }
  }
  // ------------------------------------------------------------------------------//
  return (
    <article className="appointment">
      <Header time={time}/>
      {/* {(interview) ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => (transition(CREATE))}/>}
      {mode === SHOW && (
        <Show 
          student={interview.student}
          // interviewer={interview}
          interviewer={findInterviewer(interview,interviewers)}
        />
      )}
      {mode === SAVING && (
        <Status message={`SAVING`}/>
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