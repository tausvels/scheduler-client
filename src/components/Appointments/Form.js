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
  const [error, setError] = useState("");
  
  const reset = () => {
    setStudentName("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    onCancel();
  };

  function validate(studentName, interviewer) {
    if (studentName === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    onSave(studentName, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            data-testid="student-name-input"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudentName(event.target.value)}
            value={studentName}
            /*
              This must be a controlled component
            */
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer}/>
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={()=> validate(studentName, interviewer)}>Save</Button>
        </section>
      </section>
  </main>
  )
}