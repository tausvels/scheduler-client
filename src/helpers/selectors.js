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