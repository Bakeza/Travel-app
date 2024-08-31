import { fireEvent } from "@testing-library/react";
import setupEventListeners from "../app";

describe("Travel Form and Date Validation", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <form id="travel-form">
          <label for="destination">Destination:</label>
          <input type="text" id="destination" name="destination" />
          <label for="start-date">Start Date:</label>
          <input type="date" id="start-date" name="start-date" />
          <label for="end-date">End Date:</label>
          <input type="date" id="end-date" name="end-date" />
          <button type="button" id="set-period">Set Period</button>
          <button type="submit">Search</button>
        </form>
        <div id="output"></div>
        <div id="travel-period"></div>
        <div id="location-image"></div>
      </div>
    `;
    setupEventListeners();
  });

  test("should display error message if form fields are empty on submit", () => {
    const form = document.querySelector("#travel-form");
    fireEvent.submit(form);

    expect(document.querySelector("#output")).toHaveTextContent(
      "Please fill out all fields."
    );
  });

  test("should display error message if end date is before start date on submit", () => {
    document.querySelector("#destination").value = "Paris";
    document.querySelector("#start-date").value = "2024-09-05";
    document.querySelector("#end-date").value = "2024-09-04";

    const form = document.querySelector("#travel-form");
    fireEvent.submit(form);

    expect(document.querySelector("#output")).toHaveTextContent(
      "End date must be after the start date."
    );
  });

  test("should display travel period when valid dates are set", () => {
    document.querySelector("#start-date").value = "2024-09-01";
    document.querySelector("#end-date").value = "2024-09-10";

    const setPeriodButton = document.querySelector("#set-period");
    fireEvent.click(setPeriodButton);

    expect(document.querySelector("#travel-period")).toHaveTextContent(
      "Travel Period: 9 days from 2024-09-01 to 2024-09-10"
    );
  });
});
