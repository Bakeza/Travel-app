function setupEventListeners() {
  const form = document.querySelector("#travel-form");
  if (!form) {
    console.error("Form element not found.");
    return;
  }

  document
    .querySelector("#travel-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const destination = document.querySelector("#destination").value;
      const startDate = document.querySelector("#start-date").value;
      const endDate = document.querySelector("#end-date").value;

      // Validate that all fields are filled
      if (!destination || !startDate || !endDate) {
        document.querySelector("#output").textContent =
          "Please fill out all fields.";
        return;
      }

      // Validate date range
      if (new Date(startDate) > new Date(endDate)) {
        document.querySelector("#output").textContent =
          "End date must be after the start date.";
        return;
      }

      // Calculate the travel period
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      document.querySelector(
        "#travel-period"
      ).textContent = `Travel Period: ${diffDays} days from ${startDate} to ${endDate}`;

      // Make the API request
      fetch("http://localhost:8081/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: destination,
          startDate: startDate,
          endDate: endDate,
        }),
      })
        .then((response) => response.text())
        .then((text) => {
          console.log("Response Text:", text);
          try {
            const data = JSON.parse(text);
            console.log(data);
            document.querySelector(
              "#output"
            ).textContent = `Weather in ${data.city} on ${startDate}: ${data.weather}`;

            // Update the image element
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
    });
}

setupEventListeners();

export default setupEventListeners;
