# Travel App

## Contents

- [Project Summary](#project-summary)
- [Features](#features)
- [APIs Used](#apis-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setup API Keys](#setup-api-keys)
  - [Build the Project](#build-the-project)
  - [Start the Development Server](#start-the-development-server)
  - [Run the Express Server](#run-the-express-server)
  - [Open in Browser](#open-in-browser)
- [Usage](#usage)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Summary

The Travel App is a custom travel planning application that allows users to enter a trip destination and departure date. The app retrieves and displays weather forecasts and location images using data from external APIs. It is built with a focus on clean and appealing HTML/CSS, JavaScript, Webpack, and Express.

## Features

- **Trip Planning Form**: Enter your travel destination and departure date.
- **Weather Forecast**: Get current or future weather forecasts using the Weatherbit API.
- **Location Image**: Display an image of the location using the Pixabay API.
- **Countdown**: View how soon your trip is.
- **Multiple Destinations**: Optionally add multiple destinations and see their weather.

## APIs Used

- **Geonames API**: Retrieves coordinates for the entered location.
- **Weatherbit API**: Provides weather forecasts based on coordinates.
- **Pixabay API**: Supplies images of the location.

## Getting Started

### Prerequisites

- Node.js (version 18.19.0 or compatible) and npm installed on your machine.
- Accounts with Geonames, Weatherbit, and Pixabay for API keys.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Bakeza/Travel-app.git
   cd Travel-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

### Setup API Keys

Create a `.env` file in the root directory with the following content:

```env
GEONAMES_API_KEY=your_geonames_username
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key
```

### Build the Project

```bash
npm run build-prod
```

### Start the Development Server

```bash
npm run build-dev
```

### Run the Express Server

```bash
npm start
```

### Open in Browser

Navigate to `http://localhost:3000` to view the app.

## Usage

- **Enter Destination and Date**: Fill in the form with your travel destination and departure date.
- **Submit Form**: The app will fetch weather data and location images based on the entered details.
- **View Results**: See the weather forecast and location image displayed on the page.

## Testing

Run unit tests using Jest:

```bash
npm run test
```

## Roadmap

- Add features for multiple destinations.
- Integrate additional APIs for hotel and flight data.
- Implement Local Storage for saving trip data.
- Extend functionality to include multiple trips with sorting and expiration features.

## Contributing

Feel free to submit pull requests or report issues. Contributions and suggestions are welcome!

## License

This project is licensed under the MIT License.

## Acknowledgements

- **Geonames API**: [Geonames](https://www.geonames.org/)
- **Weatherbit API**: [Weatherbit](https://www.weatherbit.io/)
- **Pixabay API**: [Pixabay](https://pixabay.com/api/)

