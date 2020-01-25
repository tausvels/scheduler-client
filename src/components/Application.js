import React from "react";
import "components/Application.scss";

import useApplicationData from "../hooks/useApplicationData";
import DayList from "components/DayList";
import Appointments from "components/Appointments";

// ------------ HELPER FUNCTIONS ----------------------- //
import { 
  getAppointmentsForDay, 
  getInterviewersForyDay,
  getSpotsForDay
} from "helpers/selectors";

export default function Application() {

// ---------- STATE MANAGEMENT ------------------------ //
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData()
// ----------------------------------------------------//

  const interviewersFound = getInterviewersForyDay(state, state.day);
  const appointmentsFound = getAppointmentsForDay(state, state.day);
  const appointment = appointmentsFound.map(({ id, time, interview }) => {
    return (
      <Appointments 
         key={id}
         id={id}
         time={time}
         interview={interview}
         interviewers={interviewersFound}
         bookInterview={bookInterview}
         cancelInterview={cancelInterview}
      />
    )
  })
  // ---------------------------------------------------- //
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days} 
            day={state.day} 
            setDay={setDay}
            getSpots={getSpotsForDay}
            appointments={state.appointments}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointments key="last" time="5pm" />
      </section>
    </main>
  );
}