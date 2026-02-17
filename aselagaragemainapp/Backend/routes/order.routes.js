// Import the express module
const express = require("express");
// Create a new router instance
const router = express.Router();
// Import the order controller
const orderController = require("../controllers/order.controller");
// Import the authentication middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Define the route for adding a new order
router.post(
  "/api/order",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.addOrder,
);
// Define the route for retrieving all orders
router.get(
  "/api/orders",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getAllOrders,
);
// Define the route for retrieving an order by ID
router.get(
  "/api/order/:orderId",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getOrderById,
);

//get by employee Id

router.get("/api/tasks/:EmployeeId", orderController.getTasksByEmployeeId);

//Get by Costumer Id
router.get(
  "/api/order/customer/:cutomerId",
  orderController.getOredrByCustumerId,
);
// Route to update an order
router.put(
  "/api/order",
//   [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.updateOrder,
);

// Route to delete an order by ID
router.delete(
  "/api/order/:id",
//   [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.deleteOrder,
);

// route order status check
router.put(
  "/api/orderscheck",
//   authMiddleware.verifyToken,
  orderController.orderServiceCheck,
);

// route complete order
router.put(
  "/api/orders/completed",
//   authMiddleware.verifyToken,
  orderController.orderServiceCompleted,
);

// Export the router
module.exports = router;
