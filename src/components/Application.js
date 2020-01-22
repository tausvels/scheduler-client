import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";
import "components/DayList";

import DayList from "components/DayList";
import Appointments from "components/Appointments";
import { getAppointmentsForDay } from "helpers/selectors";

const getDaysUrl = "/api/days";
const getAppointmentUrl = "/api/appointments";

export default function Application() {

  // const [day, setDay] = useState("");
  // const [days, setDays] = useState([]);

// ---------- STATE MANAGEMENT ------------------------ //
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  // --------- THE STATE PROPERTY AND THE PARAMETER PASSED NEED TO BE THE SAME --------//
  //const setDays = (days) => setState((prev) => ({...prev, days}));
  const setDay = (day) => setState((prevState) => ({...prevState, day}));
  //const setApp = (app) => setState((prev) => ({...prev, appointments: app}));
// ----------------------------------------------------//
// ------------------- USE EFFECT ---------------------//
  useEffect( () => {

    let days = Axios.get(getDaysUrl);
    let appointments = Axios.get(getAppointmentUrl);
    
    Promise.all([
      Promise.resolve(days),
      Promise.resolve(appointments)
    ])
    .then((all) => {
      const [first, second] = all; //console.log(all)
      setState(prev => ({...prev, days: first.data, appointments: second.data}));
    })
    .catch(e => console.error(e));
    
    
  }, []);
  
  const appointmentsFound = getAppointmentsForDay(state, state.day);

  // useEffect( () => {
  //   Axios.get(getDaysUrl)
  //    .then((res) => {
  //      let result = res.data;
  //      console.log("Fetched the day");
  //      setDay(result[0].name); //Default value
  //    })
  //    .catch(e => console.error(e))
  // }, [state.day])

  const appointment = appointmentsFound.map(({
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
      <nav className="sidebar__menu"><DayList days={state.days} day={state.day} setDay={setDay}/></nav>
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
