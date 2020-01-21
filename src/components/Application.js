import React, { useState } from "react";

import "components/Application.scss";
import "components/DayList";

import DayList from "components/DayList";
import Appointments from "components/Appointments";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
const appointments = [
  {id: 1, time: "12pm"},
  {id: 2, time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" }
    }
  },
  {id: 3, time: "2pm",
    interview: {
      student: "Jay S",
      interviewer: { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" }
    }
  },
  {id: 4, time: "3pm"},
  {id: 5, time: "4pm",
    interview: {
      student: "Ruthba Nitia",
      interviewer: { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
    }
  }
];

export default function Application() {
  
  const [day, setDay] = useState("Monday");
  const appointment = appointments.map(({
    id, 
    time, 
    interview
  }) => {
    return (
      <Appointments 
         key={id}
         time={time}
         interview={interview}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu"><DayList days={days} day={day} setDay={setDay}/></nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointment}
        <Appointments key="last" time="5pm" />
      </section>
    </main>
  );
}
