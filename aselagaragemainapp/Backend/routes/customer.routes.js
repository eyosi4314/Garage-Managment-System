// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the customer controller
const customerController = require("../controllers/customer.controller");
const authMiddleware = require("../middlewares/auth.middleware");
//create a route for the customer controller request a post request
router.post(
  "/api/customer",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.createCustomer,
);
//create a route for the customer controller request a get all customers request
router.get("/api/customers", customerController.getAllCustomers);
//create a route for the customer controller request a get customer by id request
router.get("/api/customer/:id", customerController.getCustomerById);
//create a route for the customer controller request a put request
router.put(
  "/api/customer/:id",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.updateCustomer,
);
//create a route for the customer controller request a delete request
router.delete(
  "/api/customer/:id",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.deleteCustomer,
);
//route get customer status
router.get("/api/customers/stats", customerController.getCustomerByStatus);

//export the router
module.exports = router;
