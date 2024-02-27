const express = require("express");
const app = express();
const cors = require("cors");
const port = 3002;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.post("/calculate-emissions", (req, res) => {
  var { distance, mileage, vehicleType } = req.body;

  // Convert vehicleType to lowercase
  const vehicleTypeLowerCase = vehicleType.toLowerCase();

  // Define emission factors for each type of vehicle (in grams per mile)
  const emissionFactors = {
    petrolcar: 147.5, // Make sure keys are lowercase
    electriccar: 4.9,
    hybridcar: 103, // Adjusted emission factor for hybrid car
  };

  // Get the emission factor for the selected vehicle type
  let emissionFactor = emissionFactors[vehicleTypeLowerCase];

  console.log("Emission factor:", emissionFactor); // Log emission factor

  // If the vehicle is a hybrid, reduce the emission factor by 25%
  if (mileage === "miles") {
    distance /= 0.621371;
  }

  // Calculate the total emissions (in grams)
  const totalEmissions = distance * emissionFactor;

  console.log("Total emissions (g):", totalEmissions); // Log total emissions

  // Convert the total emissions to kilograms (optional)
  const totalEmissionsKg = totalEmissions / 1000;

  console.log("Total emissions (kg):", totalEmissionsKg); // Log total emissions in kg

  res.json({
    emissions: (Math.round(totalEmissionsKg * 100) / 100).toFixed(2),
    distance: (Math.round(distance * 100) / 100).toFixed(2),
    mileage: mileage,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
