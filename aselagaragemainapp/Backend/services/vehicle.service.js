// Import the database connection
// const db = require("../config/dbConfig");
const conn = require("../config/db.config");

// A function to create a vehicle
async function createVehicle(vehicle) {
  try {
    const query = `
      INSERT INTO customer_vehicle_info 
      (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Use connection.query with placeholders
    const result = await conn.query(query, [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
    ]);

    // Check if insertion was successful
    if (result.affectedRows === 1) {
      return { vehicle_id: result.insertId, customer_id: vehicle.customer_id };
    } else {
      throw new Error("Failed to insert vehicle");
    }
  } catch (error) {
    throw error; // Rethrow the error after logging
  }
}
// create a function to get all vehicles per customer
async function getAllVehicles(customer_id) {
  try {
    // Query to get all vehicles for a specific customer
    const query = `
      SELECT * FROM customer_vehicle_info WHERE customer_id = ?`;

    const vehicles = await conn.query(query, [customer_id]);

    // If no vehicles are found
    if (!vehicles || vehicles.length === 0) {
      return [];
    }

    return vehicles;
  } catch (error) {
    return false;
  }
}

// create a function to get a vehicle by id
async function getVehicleById(customer_id) {
  try {
    // Query to get a vehicle by id
    const query = `
      SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?`;

    const vehicle = await conn.query(query, [customer_id]);

    // If no vehicle is found
    if (!vehicle || vehicle.length === 0) {
      return null;
    }
    console.log(vehicle);
    return vehicle[0];
  } catch (error) {
    return null;
  }
}

// Create a function to update a vehicle by id
async function updateVehicle(vehicle) {
  try {
    // Update the vehicle in the database
    const query = `
      UPDATE customer_vehicle_info 
      SET vehicle_make = ?, vehicle_model = ?, vehicle_year = ?, vehicle_tag = ?, vehicle_mileage = ?, vehicle_color = ?, vehicle_type = ?, vehicle_serial = ?
      WHERE vehicle_id = ?`;

    const rows = await conn.query(query, [
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_year,
      vehicle.vehicle_tag,
      vehicle.vehicle_mileage,
      vehicle.vehicle_color,
      vehicle.vehicle_type,
      vehicle.vehicle_serial,
      vehicle.vehicle_id,
    ]);

    // If the vehicle was not updated
    if (rows.affectedRows !== 1) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Export the functions
module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
};
