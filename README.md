# Interview Scheduler
A single page REACT based web application that lets the user book an interview with a set of given Interviewers served from an API being hosted at https://scheduleinterview.herokuapp.com/api/interviewers. The API also contains a list of days from Monday to Friday and time slots between 12pm to 5pm.

The app is capable of doing the following things:
- Book an interview in an empty slot.
- Edit and delete an interview.
- Save or delete an ionterview to the database that is being served on the heroku site.
- Decrease the number of slots available when an interview is booked.
- Increase the number of slots available when an interview is cancelled.
- Update the GUI for other users REAL TIME on the number of slots and time range available to book an interview.   

## Link to the deployed Application

https://scheduleinterview.netlify.com/  

## Setup

Install dependencies with `npm install`.

## User Experience Screenshots

![Landing_page](screenshots/1.landing_pg.PNG)
![Booking_interview_process](screenshots/2.booking_interview_process.png)
![Edit_delete_interview](screenshots/3.edit_delete_interview.png)
![Multiple_interview and slot update](screenshots/4.delete_and_multiple_interview.png)


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
