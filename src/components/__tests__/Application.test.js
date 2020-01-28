import React from "react";

import { 
  render, 
  cleanup, 
  getByText,
  getAllByTestId,
  getByPlaceholderText, 
  waitForElement, 
  fireEvent,
  prettyDOM, 
  getByAltText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  
  xit("renders without crashing", () => {
    render(<Application />);
  });

  //---- USING STANDARD PROMISE AND .THEN METHOD ------------------------------------- //
  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => { 
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  //---- USING THE STANDARD ASYNC METHOD -------------------------------------------- //
  xit("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  xit("changes the schedule when a new day is selected", () => {
    const { getyByText, debug } = render(<Application />);
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement( () => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, "appointment")[0];

    // ----- Adding the events specific to this appointment to test the save action ---- //
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    
    // ------------ USING THE ASYNC AWAIT METHOD TO WAIT TO FINISH SAVING --------------- //
    // await act( async () => { await fireEvent.click(getByText(appointment, "Save"))})

    // ------------ USING THE 'WAITFORELEMENT() TO WAIT TO FINISH SAVING ---------------- //
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

})