import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "../Appointments/index";

afterEach(cleanup);

describe("Appointment Component", () => {
  
  xit("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("Calls the mock function", ()=> { 
    const myFunc = jest.fn();
    myFunc();
    expect(myFunc).toHaveBeenCalledTimes(1);
  })

})

