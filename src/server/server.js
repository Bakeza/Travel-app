const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("src/client"));
app.use(express.static("dist"));

app.post("/api", async function (req, res) {
  const { destination, date } = req.body;

  const fetch = (await import("node-fetch")).default;

  try {
    const geoData = await fetch(
      `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`
    );
    const geoResult = await geoData.json();
    const lat = geoResult.geonames[0].lat;
    const lng = geoResult.geonames[0].lng;

    // Fetch Weather data
    const weatherData = await fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_KEY}`
    );
    const weatherResult = await weatherData.json();
    const weatherDescription =
      weatherResult.data && weatherResult.data.length > 0
        ? weatherResult.data[0].weather.description
        : "No weather information available";

    const pixabayData = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${destination}&image_type=photo`
    );
    const pixabayResult = await pixabayData.json();
    const imageUrl =
      pixabayResult.hits.length > 0 ? pixabayResult.hits[0].webformatURL : null;

    const responseData = {
      city: destination,
      date: date,
      weather: weatherDescription,
      imageUrl: imageUrl,
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8081, function () {
  console.log("Travel app listening on port 8081!");
});
