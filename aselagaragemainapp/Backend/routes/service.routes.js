// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const serviceController = require("../controllers/service.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
//create a get all services route
// router.get("/api/services", serviceController.getAllServices);

router.get(
  "/api/services",
  // [authMiddleware.verifyToken, authMiddleware.isManager_or_Admin],
  serviceController.getAllServices,
);
router.get(
  "/api/service/:id",
//   [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.getServiceById,
);

router.post(
  "/api/service",
//   [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.createService,
);
router.put(
  "/api/service/:service_id",
//   [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.updateServiceController,
);
router.delete(
  "/api/service/:id",
//   [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.deactivateService,
);

router.get(
  "/api/customer/services",
  // [authMiddleware.verifyToken], // Ensure the user is authenticated
  serviceController.getCustomerServices
);

// Export the router
module.exports = router;
