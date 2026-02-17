// order.controller.js

// Import the order service
const orderService = require("../services/order.service");

// ===================== Add Order =====================
async function addOrder(req, res) {
  try {
    const orderData = req.body || {};

    const { customer_id, employee_id, vehicle_id, order_services, Order_Date } =
      orderData;

    if (
      !customer_id ||
      !employee_id ||
      !vehicle_id ||
      !order_services ||
      !Order_Date
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    console.log("Received order data:", orderData);

    const newOrder = await orderService.addOrder(orderData);

    if (newOrder.status === "success") {
      return res.status(201).json({
        message: "Order created successfully",
        success: true,
      });
    } else {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to add order",
      });
    }
  } catch (error) {
    console.error("Error adding order:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// ===================== Get All Orders =====================
async function getAllOrders(req, res) {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while retrieving orders",
    });
  }
}

// ===================== Get Order By ID =====================
async function getOrderById(req, res) {
  try {
    const orderId = req.params.orderId;
    if (!orderId) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Order ID is required",
      });
    }

    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// ===================== Update Order =====================
async function updateOrder(req, res) {
  try {
    const orderData = req.body || {};
    const {
      order_id,
      customer_id,
      employee_id,
      vehicle_id,
      order_date,
      estimated_completion_date,
      completion_date,
      order_description,
      order_completed,
      order_services,
    } = orderData;

    if (
      !order_id ||
      !customer_id ||
      !employee_id ||
      !vehicle_id ||
      !order_date ||
      !order_services ||
      typeof order_completed === "undefined"
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    const result = await orderService.updateOrder(orderData);

    if (result.status === "success") {
      return res.status(200).json({
        message: "Order updated successfully",
        success: true,
      });
    } else if (result.status === "fail" && result.error === "not_found") {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found",
      });
    } else {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred",
      });
    }
  } catch (error) {
    console.error("Update Order Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// ===================== Delete Order =====================
async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Order ID is required",
      });
    }

    const result = await orderService.deleteOrderById(orderId);

    if (!result) {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete Order Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// ===================== Get Orders by Employee ID =====================
async function getTasksByEmployeeId(req, res) {
  try {
    const employeeId = req.params.EmployeeId;
    if (!employeeId) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Employee ID is required",
      });
    }

    const orders = await orderService.getOrderByEmployeeId(employeeId);
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Orders not found",
      });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders by employee:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// ===================== Get Orders by Customer ID =====================
async function getOrderByCustomerId(req, res) {
  try {
    const customerId = req.params.customerId;
    if (!customerId) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Customer ID is required",
      });
    }

    const orders = await orderService.getOrderByCustomerId(customerId);
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Orders not found",
      });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders by customer:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// ===================== Update Order Service Status =====================
async function orderServiceCheck(req, res) {
  try {
    const { serviceId, orderId, serviceCompleted } = req.body || {};

    if (!serviceId || !orderId || typeof serviceCompleted === "undefined") {
      return res.status(400).json({
        error: "Bad Request",
        message: "serviceId, orderId, and serviceCompleted are required",
      });
    }

    const success = await orderService.orderServiceCheck({
      serviceId,
      orderId,
      serviceCompleted,
    });

    return res.status(200).json({
      success,
      message: success
        ? "Service status updated successfully"
        : "Failed to update service status",
    });
  } catch (error) {
    console.error("Order Service Check Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}

// ===================== Mark Order Completed =====================
async function orderServiceCompleted(req, res) {
  try {
    const { orderId } = req.body || {};

    if (orderId === undefined || orderId === null) {
      return res.status(400).json({
        error: "Bad Request",
        message: "orderId is required",
      });
    }

    const success = await orderService.OrderCompleted({ orderId });

    return res.status(200).json({
      success,
      message: success
        ? "Order marked as completed successfully"
        : "Failed to mark order completed",
    });
  } catch (error) {
    console.error("Order Completed Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}

// ===================== Exports =====================
module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getTasksByEmployeeId,
  getOrderByCustomerId,
  orderServiceCheck,
  orderServiceCompleted,
};
