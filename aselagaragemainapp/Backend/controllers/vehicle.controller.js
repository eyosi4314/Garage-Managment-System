// Import the vehicle service
const vehicleService = require("../services/vehicle.service");

// Create a function to create a vehicle
async function createVehicle(req, res, next) {
  try {
    // Get the vehicle data from the request body
    const vehicleData = req.body;

    // Call the createVehicle method from the vehicle service
    const vehicleCreated = await vehicleService.createVehicle(vehicleData);

    if (!vehicleCreated) {
      return res.status(400).json({ error: "Vehicle not created" });
    } else {
      res.status(201).json({
        message: "Vehicle created successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error); // Debugging purposes

    // Send the error as a response
    res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }
}

//create a function to get all vehicles per customer
async function getAllVehicles(req, res, next) {
  const { customer_id } = req.params; // Assuming customer_id is passed as a URL parameter
  console.log("Fetching vehicles for customer with ID:", customer_id); // Log the customer_id
  try {
    const vehicles = await vehicleService.getAllVehicles(customer_id);
    console.log("Vehicles found:", vehicles); // Log the vehicles array
    if (!vehicles || vehicles.length === 0) {
      return res.status(401).json({ error: "Vehicles not found" });
    }
    res.status(200).json(vehicles);
  } catch (error) {
    console.log(error); // Debugging purposes

    // Send the error as a response
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while fetching the vehicles.",
    });
  }
}

// create a function to get a vehicle by id
async function getVehicleById(req, res, next) {
  const { customer_id } = req.params; // Assuming ID is passed as a URL parameter
  console.log("Fetching vehicle with ID:", customer_id); // Log the ID
  try {
    const vehicle = await vehicleService.getVehicleById(customer_id);
    console.log("Vehicle found:", vehicle); // Log the vehicle object
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.log(error); // Debugging purposes

    // Send the error as a response
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while fetching the vehicle.",
    });
  }
}

// Create a function to update a vehicle
async function updateVehicle(req, res, next) {
  try {
    // Get the vehicle data from the request body
    const vehicleData = req.body;
    // check if the vehicle id is provided
    if (!vehicleData.vehicle_id) {
      return res.status(400).json({ error: "Vehicle ID is required" });
    }

    // Call the updateVehicle method from the vehicle service
    const vehicleUpdated = await vehicleService.updateVehicle(vehicleData);

    if (!vehicleUpdated) {
      return res.status(400).json({ error: "Vehicle not updated" });
    } else {
      res.status(200).json({
        message: "Vehicle updated successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error); // Debugging purposes

    // Send the error as a response
    res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }
}

// Export the functions
module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
};
