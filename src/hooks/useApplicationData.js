import { useEffect, useReducer } from 'react';
import Axios from "axios";

import {
  reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../reducers/reducerFunc";

export default useApplicationData () {

  // ------------ STATE MANAGEMENT --------------------------- //
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // ------------ THE SET DAY FUNCTION ---------------------- //
  const setDay = day => dispatch({type: SET_DAY, day});

  //- HAVE TO USE USE-EFFECT BECAUSE DATA IS RETRIEVED FROM API AND THEN USED TO UPDATE STATE ----- //
    const getDaysUrl = `/api/days`;
    const getAppointmentsUrl = `/api/appointments`;
    const getInterviewersUrl = `/api/interviewers`;
  // ------------ FETCHING DATA FROM API --------------------------- //
  useEffect(() => {
    const days = Axios.get(getDaysUrl);
    const appointments = Axios.get(getAppointmentsUrl);
    const interviewersList = Axios.get(getInterviewersUrl);

    Promise.all([
      days,
      appointments,
      interviewersList
    ])
    .then((response) => {
      const [daysData, appointmentsData, interviewersData] = all;
      dispatch({
        type: SET_APPLICATION_DATA,
        days: daysData.data,
        appointments: appointmentsData.data,
        interviewers: interviewersData.data
      })
    })
    .catch(e => console.error(e))

  }, []);

  const bookInterview = function (id, interviewObj) {
    const req = {
      url: `/api/appointments/${id}`,
      method: `PUT`,
      data: {interviewObj}
    }
    return Axios(req)
    .then(dispatch({
      type: SET_INTERVIEW, id, interviewObj
    }))
    .catch(e => console.error(e))
  };

  const cancelInterview = function (id) {
    const req = {
      url: `/api/appointments/${id}`,
      method: `DELETE`
    }
    return Axios(req)
    .then(dispatch({ type: SET_INTERVIEW, id, interview: null }))
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}