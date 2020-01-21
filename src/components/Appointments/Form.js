import React, { useState } from 'react';

import InterviewerList from '../InteviewerList';
import Button from '../Button';

export default function Form ({
  name,
  interviewers,
  value,
  onSave,
  onCancel
}) {

  const [studentName, setStudentName] = useState(name || "");
  const [interviewer, setInterviewer] = useState(value || null);
  
  const reset = () => {
    setStudentName("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    onCancel();
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudentName(event.target.value)}
            value={studentName}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={()=> onSave(studentName, interviewer)}>Save</Button>
        </section>
      </section>
  </main>
  )
}