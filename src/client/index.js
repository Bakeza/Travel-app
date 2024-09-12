import "./styles/style.scss";

function handleFormSubmit(event) {
  event.preventDefault();

  const destination = document.querySelector("#destination").value;
  const startDate = document.querySelector("#start-date").value;
  const endDate = document.querySelector("#end-date").value;

  if (!destination || !startDate || !endDate) {
    document.querySelector("#output").textContent =
      "Please fill out all fields.";
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    document.querySelector("#output").textContent =
      "End date must be after the start date.";
    return;
  }

  calculateTravelPeriod(startDate, endDate);
  makeApiRequest(destination, startDate, endDate);
}

// Function to calculate and display travel period
function calculateTravelPeriod(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  document.querySelector(
    "#travel-period"
  ).textContent = `Travel Period: ${diffDays} days from ${startDate} to ${endDate}`;
}

function makeApiRequest(destination, startDate, endDate) {
  fetch("http://localhost:8081/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ destination, startDate, endDate }),
  })
    .then((response) => response.text())
    .then((text) => {
      console.log("Response Text:", text);
      try {
        const data = JSON.parse(text);
        document.querySelector(
          "#output"
        ).textContent = `Weather in ${data.city} on ${startDate}: ${data.weather}`;

        if (data.imageUrl) {
          document.querySelector(
            "#location-image"
          ).innerHTML = `<img src="${data.imageUrl}" alt="Image of ${data.city}" />`;
        } else {
          document.querySelector(
            "#location-image"
          ).innerHTML = `<p>No image available</p>`;
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function setupEventListeners() {
  const form = document.querySelector("#travel-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
}

setupEventListeners();

export {
  calculateTravelPeriod,
  handleFormSubmit,
  makeApiRequest,
  setupEventListeners,
};
