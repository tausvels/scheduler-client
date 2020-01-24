import React from 'react';
import Button from "../Button";

export default function Confirm ({
  id,
  interview,
  message,
  onConfirm,
  onCancel
}) {
  console.log({id, interview, onConfirm})
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={()=>(onConfirm(id, interview))}>Confirm</Button>
      </section>
    </main>
  )
}