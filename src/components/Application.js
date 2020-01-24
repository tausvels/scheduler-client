import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";
import "components/DayList";

import DayList from "components/DayList";
import Appointments from "components/Appointments";
import { 
  getAppointmentsForDay, 
  getInterviewersForyDay,
  getSpotsForDay,
  getInterview
} from "helpers/selectors";

const getDaysUrl = "/api/days";
const getAppointmentUrl = "/api/appointments";
const getInterviewers = "/api/interviewers";

export default function Application() {

// ---------- STATE MANAGEMENT ------------------------ //
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = (day) => setState((prevState) => ({...prevState, day}));

// ----------------------------------------------------//
// ------------------- USE EFFECT ---------------------//
  useEffect( () => {

    let days = Axios.get(getDaysUrl);
    let appointments = Axios.get(getAppointmentUrl);
    let interviewersList = Axios.get(getInterviewers);
    
    Promise.all([
      Promise.resolve(days),
      Promise.resolve(appointments),
      interviewersList
    ])
    .then((all) => {
      const [first, second, third] = all; //console.log(all)
      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}));
    })
    .catch(e => console.error(e));
  }, []);

  // --------------- GENERATE THE APPOINTMENT COMPONENT -------------------------------// 
  function bookInterview (id, interview) {
    // console.log(id, interview);
    const appointment = state.appointments[id];
    appointment.interview = { ...interview };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const req = {
      url: `/api/appointments/${id}`,
      method: `PUT`,
      data: {interview}
    }
    return Axios(req)
    .then(res => setState({...state, appointments}));

  }

  function cancelInterview (id, interview) {
    interview = {};
    const appointment = {
      ...state.appointments[id],
      interview: null
    }; console.log(interview)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let req = {
      url: `/api/appointments/${id}`,
      method: `DELETE`,
      data: {interview}
    }
    return Axios(req)
    .then(res => {
      console.log(res.status);
      setState({...state, appointments});
    });
  }

  const interviewersFound = getInterviewersForyDay(state, state.day);
  const appointmentsFound = getAppointmentsForDay(state, state.day);
  const appointment = appointmentsFound.map(({
    id, 
    time, 
    interview
  }) => {
    // console.log(interviewersFound)
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
  // ------------------------------------------------------------------------------------ //
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
      <nav className="sidebar__menu">
        <DayList 
          days={state.days} 
          day={state.day} 
          setDay={setDay}
          getSpots={getSpotsForDay}
          appointments={state.appointments}
        /></nav>
      {/* <nav className="sidebar__menu"><DayList days={state} day={state} setDay={setDay}/></nav> */}
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
