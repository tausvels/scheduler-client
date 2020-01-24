import React from 'react';

import DayListItem from "components/DayListItem";

export default function DayList ({
  days, day, setDay, getSpots, appointments
}) {
  const daysArr = days;
  const output = daysArr.map(d => (
    <DayListItem 
      key={d.id}
      name={d.name}
      spots={getSpots(appointments, days, d.name) || 5}
      selected={d.name === day}
      setDay={setDay}
    />
  ));
  return (
    <ul>{output}</ul>
  )
}