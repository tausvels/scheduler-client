import React, { Fragment } from 'react';

import "./styles.scss";

import {useVisualMode} from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const ERROR = "ERROR";

export default function Appointments ({  
  time,
  id,
  interview,
  interviewers,
  bookInterview,
  cancelInterview
}) {

  //-------------- STATE MANAGEMENT -----------------------------------------------//
  const { mode, transition, back } = useVisualMode (interview ? SHOW : EMPTY);
  //-------------------------------------------------------------------------------//

  // ----- FUNCTION DECLARATIONS -------------------------------------------------//
  const findInterviewer = function (obj, arr) {
    if (!obj) {return {name:""}} 
    else {
      const intId = obj.interviewer;
      const output = arr.filter(item => item.id === intId)
      return output[0];
    }
  }

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
    .then(resolve => transition(SHOW))
    .catch(e => {
      console.error(e);
      transition(ERROR);
    });
    
  };

  const deleteInterview = function (id, interview) {
    // console.log(id)
    transition("DELETE")
    cancelInterview(id, interview)
    .then(resolve => {transition("EMPTY")})
    .catch(e => {
      console.error(e);
      transition(ERROR);
    });
    // setTimeout(()=>{transition("EMPTY")}, 2000);
    // transition("EMPTY")
  }
  
  // const editInterview = function (id, interview) {
  //   transition("")
  // }
  // ------------------------------------------------------------------------------//
  return (
    <article className="appointment">
      <Header time={time}/>
      {/* {(interview) ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => (transition(CREATE))}/>}
      {mode === SHOW && (
        <Show
          id={id} 
          student={(interview) ? interview.student : ''}
          interview={interview}
          interviewer={findInterviewer(interview,interviewers)}
          onDelete={()=>(transition(CONFIRM))}
          onEdit={() => (transition(EDIT))}
        />
      )}
      {mode === SAVING && (<Status message={`SAVING`}/>)}
      {mode === CREATE && (
        <Form 
        interviewers={interviewers} 
        onCancel={() => (back())}
        onSave={save}
      />
      )}
      {mode === EDIT && (
        <Form 
          name={interview.student}
          value={interview.interviewer}
          interviewers={interviewers}
          onCancel={() => (back())}
          onSave={save}
        />)}
      {mode === CONFIRM && (
        <Confirm 
          id={id}
          interview={interview}
          message="Are you sure you want to delete?"
          onConfirm={deleteInterview}
          onCancel={()=>(transition("SHOW"))}
        />
      )}
      {mode === DELETE && (<Status message={`DELETING`}/>)} 
      {mode === ERROR && (<Error message={`SERVER ERROR 500`} onClose={() => (transition(SHOW))}/>)}
    </article>
  )
}