export function getAppointmentsForDay(state, day) {
  const wantedDay = state.days.find(a => a.name === day);
  let wantedApp=[];
  if(wantedDay){
    for (let app_id of wantedDay.appointments) {
      if (state.appointments[app_id]) {
        wantedApp.push(state.appointments[app_id]);
      }
    }
  }
  return wantedApp;
}

export function getInterview (state, interview) {
  let interviewerId;
  let temp = {};
  let result = null;

  if (interview) {
    interviewerId = interview.interviewer;
    temp = state.interviewers[`${interviewerId}`];

    return result = {
      interviewer: {
        id: temp.id,
        name: temp.name,
        avatar: temp.avatar
      },
      student: interview.student
  }
  } else {
    return result;
  }
  
}

export function getInterviewersForyDay(state, day) {
  const wantedDay = state.days.find(a => a.name === day);
  let wantedApp=[];
  if(wantedDay){
    for (let interviewId of wantedDay.interviewers) {
      if (state.interviewers[interviewId]) {
        wantedApp.push(state.interviewers[interviewId]);
      }
    }
  }
  return wantedApp;
}