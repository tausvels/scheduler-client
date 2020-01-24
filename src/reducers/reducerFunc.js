export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export function reducer(state, action) {
  const { appointments, days, day, id, interviewers, interview, type } = action;
  
  switch (type) {
    case SET_DAY:
      return { ...state, day }

    case SET_APPLICATION_DATA:
      return { ...state, days, appointments, interviewers }

    case SET_INTERVIEW: {
      const appointment = state.appointments[id];
      appointment.interview = { ...interview };
      
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return { ...state, appointments } 
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

