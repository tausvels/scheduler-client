import React, { useEffect } from 'react';
import "./styles.scss";
import {useVisualMode} from "../../hooks/useVisualMode";

// ----------------- IMPORTING COMPONENTS ----------------------- //
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
// --------- DECLARING TRANSITION VARIABLES USED BY THE HOOK ---- //
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

  // ------------- FUNCTION DECLARATIONS ------------------------------------------//
  const findInterviewer = function (obj, arr) {
    if (!obj) {return {name: ""}} 
    else {
      const intId = obj.interviewer;
      const output = arr.filter(item => item.id === intId)
      return output[0];
    }
  }

  const save = function (name, interviewer) {console.log("inside save ==> ", name, interviewer)
    const interview = {
      student: name,
      interviewer: interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(e => {
      console.error(e);
      transition(ERROR);
    });
  };

  const deleteInterview = function (id, interview) {
    transition("DELETE")
    cancelInterview(id)
    .then(() => {transition("EMPTY")})
    .catch(e => {
      console.error(e);
      transition(ERROR);
    });
    // setTimeout(()=>{transition("EMPTY")}, 2000);
    // transition("EMPTY")
  }
  // console.log(`Interview:: ====>>> ${interview}`)

  useEffect(()=> {
    if (interview &&  mode === EMPTY) {
      transition(SHOW)
    } 
    if (!interview && mode === SHOW ) {
      transition(EMPTY)
    }
  }, [interview, mode, transition]);
  // ------------------------------------------------------------------------------//
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => (transition(CREATE))}/>}
      {mode === SHOW && (
        <Show
          id={id} 
          student={(interview) ? interview.student : ''}
          interview={interview}
          interviewer={findInterviewer(interview, interviewers)}
          // interviewer={interviewers}
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