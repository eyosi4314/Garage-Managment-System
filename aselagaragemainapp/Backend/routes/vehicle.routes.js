// Import the express module
const express = require("express");
// Import the router method from express
const router = express.Router();
// Import the vehicle controller
const vehicleController = require("../controllers/vehicle.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create a route for the vehicle controller request with a POST request
router.post(
  "/api/vehicle",
//   [authMiddleware.verifyToken, authMiddleware.isManager_or_Admin],
  vehicleController.createVehicle,
);
// create a route for the vehicle controller request with a GET all vehicles request
router.get("/api/vehicles/:customer_id", vehicleController.getAllVehicles);
// create a route for the vehicle controller request with a GET vehicle by id request
router.get(
  "/api/vehicle/customer/:customer_id",
//   [authMiddleware.verifyToken, authMiddleware.isManager_or_Admin],
  vehicleController.getVehicleById,
);
//create a route for the vehicle controller request with a PUT request
router.put("/api/vehicle/:vehicle_id", vehicleController.updateVehicle);

// Export the router
module.exports = router;
