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
  interviewers
}) {
  
  const { mode, transition, back } = useVisualMode (interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time}/>
      {/* {(interview) ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => (transition(CREATE))}/>}
      {mode === SHOW && (
        <Show 
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
       {mode === CREATE && <Form interviewers={interviewers} onCancel={() => (back())}/>} 
    </article>
  )
}