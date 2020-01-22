export function getAppointmentsForDay(state, dayName) {
  const wantedDay = state.days.filter(day => day.name === dayName);
  let wantedApp=[];
  if(wantedDay.length){
    for (let app_id of wantedDay[0].appointments) {
      for (let app in state.appointments) {
        if (app_id == app) {
          wantedApp.push(state.appointments[app]);
        }
      }
    }
  }
  return wantedApp;
}