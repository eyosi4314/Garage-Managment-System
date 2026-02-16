// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
async function getAllServices() {
  //fetch all services
  try {
    const query =
      "SELECT service_id, service_name, service_description  FROM common_services  WHERE active = 1";

    const rows = await conn.query(query);
    return rows;
  } catch (error) {
    throw new Error("Error fetching services: " + error);
  }
}

async function getServiceById(serviceId) {
  const query =
    "SELECT service_id, service_name, service_description FROM common_services WHERE service_id = ? AND active = 1";
  const rows = await conn.query(query, [serviceId]);
  return rows;
}
async function createService(ServiceData) {
  const {
    service_name,
    service_description,
  } = ServiceData;

  if (
    service_name === undefined ||
    service_description === undefined
  ) {
    throw new Error("Some service parameters are undefined");
  }

  const query = `
    INSERT INTO common_services (service_name, service_description)
    VALUES (?, ?)`;

  try {
    // Execute the query
    const result = await conn.query(query, [
      service_name,
      service_description,
    ]);

    // Check if exactly one row was inserted
    if (result.affectedRows !== 1) {
      throw new Error("Failed to add the service");
    } else {
      console.log("Service added successfully");
      const insertedServiceId = result.insertId;
      return insertedServiceId;
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Re-throw the error after logging it
  }
}

async function updateService(serviceId, serviceData) {
  const query =
    "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?";

  try {
    // Execute the query
    const result = await conn.query(query, [
      serviceData.service_name,
      serviceData.service_description,
      serviceId,
    ]);
    // Check if exactly one row was affected
    if (result.affectedRows !== 1) {
      return false;
    } else {
      console.log("Service Updated successfully");
      return true;
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Re-throw the error after logging it
  }
}

async function deactivateService(serviceId) {
  const query = "UPDATE common_services SET active = 0 WHERE service_id = ?";
  const result = await conn.query(query, [serviceId]);
  return result;
}
module.exports = {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  deactivateService,
};


// when i arrange the db table i will add the price column and update the code accordingly

// // Import the query function from the db.config.js file
// const conn = require("../config/db.config");
// // Import the bcrypt module
// const bcrypt = require("bcrypt");
// // A function to check if employee exists in the database
// async function getAllServices() {
//   //fetch all services
//   try {
//     const query =
//       "SELECT service_id, service_name, service_price, service_description  FROM common_services  WHERE active = 1";

//     const rows = await conn.query(query);
//     return rows;
//   } catch (error) {
//     throw new Error("Error fetching services: " + error);
//   }
// }

// async function getServiceById(serviceId) {
//   const query =
//     "SELECT service_id, service_name, service_description FROM common_services WHERE service_id = ? AND active = 1";
//   const rows = await conn.query(query, [serviceId]);
//   return rows;
// }
// async function createService(ServiceData) {
//   const {
//     service_name,
//     service_price,
//     service_description,
//     createdBy,
//     active,
//   } = ServiceData;

//   if (
//     service_name === undefined ||
//     service_price === undefined ||
//     service_description === undefined ||
//     createdBy === undefined
//   ) {
//     throw new Error("Some service parameters are undefined");
//   }

//   const query = `
//     INSERT INTO common_services (service_name, Service_Price, service_description, createdBy, active)
//     VALUES (?, ?, ?, ?, ?)`;

//   try {
//     // Execute the query
//     const result = await conn.query(query, [
//       service_name,
//       service_price,
//       service_description,
//       createdBy,
//       active,
//     ]);

//     // Check if exactly one row was inserted
//     if (result.affectedRows !== 1) {
//       throw new Error("Failed to add the service");
//     } else {
//       console.log("Service added successfully");
//       const insertedServiceId = result.insertId;
//       return insertedServiceId;
//     }
//   } catch (error) {
//     console.error("Error executing query:", error);
//     throw error; // Re-throw the error after logging it
//   }
// }

// async function updateService(serviceId, serviceData) {
//   const query =
//     "UPDATE common_services SET service_name = ?, Service_Price = ?, service_description = ? WHERE service_id = ?";

//   try {
//     // Execute the query
//     const result = await conn.query(query, [
//       serviceData.service_name,
//       serviceData.service_price,
//       serviceData.service_description,
//       serviceId,
//     ]);
//     // Check if exactly one row was affected
//     if (result.affectedRows !== 1) {
//       return false;
//     } else {
//       console.log("Service Updated successfully");
//       return true;
//     }
//   } catch (error) {
//     console.error("Error executing query:", error);
//     throw error; // Re-throw the error after logging it
//   }
// }

// async function deactivateService(serviceId) {
//   const query = "UPDATE common_services SET active = 0 WHERE service_id = ?";
//   const result = await conn.query(query, [serviceId]);
//   return result;
// }
// module.exports = {
//   getAllServices,
//   createService,
//   getServiceById,
//   updateService,
//   deactivateService,
// };
