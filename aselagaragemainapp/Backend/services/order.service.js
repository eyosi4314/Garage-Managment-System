const conn = require("../config/db.config");

// Generate unique order hash
function generateOrderHash() {
  return Math.random().toString(36).substring(2, 15);
}

// Add a new order
async function addOrder(orderData) {
  try {
    const insertOrderQuery = `
      INSERT INTO orders (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const orderHash = generateOrderHash();

    const orderResult = await conn.query(insertOrderQuery, [
      orderData.employee_id,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.order_date,
      true, // active_order defaults to true
      orderHash,
    ]);

    const newOrderId = orderResult.insertId;

    return { status: "success", order_id: newOrderId };
  } catch (error) {
    console.error("Error adding order:", error);
    return { status: "fail", message: "Failed to add the order" };
  }
}

// Get all orders
async function getAllOrders() {
  try {
    const query = `SELECT * FROM orders ORDER BY order_date DESC`;
    const rows = await conn.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

// Get order by ID
async function getOrderById(orderId) {
  if (!orderId) throw new Error("Invalid order ID");
  try {
    const [rows] = await conn.query("SELECT * FROM orders WHERE order_id = ?", [
      orderId,
    ]);
    if (!rows || rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error("Error retrieving order by ID:", error);
    throw new Error("Failed to retrieve order");
  }
}

// Update order
async function updateOrder(orderData) {
  const {
    order_id,
    employee_id,
    customer_id,
    vehicle_id,
    order_date,
    active_order,
  } = orderData;
  try {
    const check = await conn.query("SELECT * FROM orders WHERE order_id = ?", [
      order_id,
    ]);
    if (check.length === 0) return { status: "fail", error: "not_found" };

    await conn.query(
      `UPDATE orders SET employee_id = ?, customer_id = ?, vehicle_id = ?, order_date = ?, active_order = ? WHERE order_id = ?`,
      [
        employee_id,
        customer_id,
        vehicle_id,
        order_date,
        active_order ?? true,
        order_id,
      ],
    );

    return { status: "success" };
  } catch (error) {
    console.error("Error updating order:", error);
    return { status: "error", message: error.message };
  }
}

// Delete order
async function deleteOrderById(orderId) {
  try {
    const check = await conn.query("SELECT * FROM orders WHERE order_id = ?", [
      orderId,
    ]);
    if (check.length === 0) return false;

    await conn.query("DELETE FROM orders WHERE order_id = ?", [orderId]);
    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}

// Get orders by employee
async function getOrderByEmployeeId(employeeId) {
  if (!employeeId) throw new Error("Invalid employee ID");
  try {
    const rows = await conn.query(
      "SELECT * FROM orders WHERE employee_id = ? ORDER BY order_date DESC",
      [employeeId],
    );
    return rows.length === 0 ? null : rows;
  } catch (error) {
    console.error("Error retrieving orders by employee ID:", error);
    throw new Error("Failed to retrieve orders");
  }
}

// Get orders by customer
async function getOrderByCustomerId(customerId) {
  if (!customerId) throw new Error("Invalid customer ID");
  try {
    const rows = await conn.query(
      "SELECT * FROM orders WHERE customer_id = ? ORDER BY order_date DESC",
      [customerId],
    );
    return rows.length === 0 ? null : rows;
  } catch (error) {
    console.error("Error retrieving orders by customer ID:", error);
    throw new Error("Failed to retrieve orders");
  }
}

// Export all service functions
module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrderById,
  getOrderByEmployeeId,
  getOrderByCustomerId,
};
