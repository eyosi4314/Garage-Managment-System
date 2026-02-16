const db = require("../config/db.config");
const bcrypt = require("bcrypt");

// A function to check if a customer exists
async function checkIfCustomerExists(email) {
  //check if customer email already exists in the database
  const query = `SELECT * FROM customer_identifier WHERE customer_email = ?`;
  const rows = await db.query(query, [email]);
  console.log("Query result (rows):", rows); // Ensure it logs an array of objects
  if (rows.length > 0) {
    return true;
  } else {
    return false;
  }
}

// A function to create a customer
async function createCustomer(customer) {
  let createdCustomer = {};
  try {
    // Generate a salt and hash the customer's hash
    const salt = await bcrypt.genSalt(10);
    const hashedCustomer = await bcrypt.hash(customer.customer_password, salt);

    // Insert into customer_identifier table
    const query = `
      INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) 
      VALUES (?, ?, ?)`;
    const rows = await db.query(query, [
      customer.customer_email,
      customer.customer_phone_number,
      hashedCustomer,
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }
    const customer_id = rows.insertId;

    // Insert into customer_info table
    const query2 = `
      INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) 
      VALUES (?, ?, ?, ?)`;
    const rows2 = await db.query(query2, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      1,
    ]);

    // Construct the customer object to return
    createdCustomer = {
      customer_id,
      customer_email: customer.customer_email,
    };
    return createdCustomer;
    // return {
    //   customer_id,
    //   customer_email: customer.customer_email,
    // };
  } catch (error) {
    console.log("Error creating customer:", error);
    return false;
  }
  // Return the created customer
  return createdCustomer;
}

// A function to get all customers
async function getAllCustomers() {
  console.log("Fetching latest 10 customers");

  const query = `
    SELECT *
    FROM customer_identifier
    INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
    ORDER BY customer_identifier.customer_id DESC`;

  try {
    const rows = await db.query(query);
    console.log("Query result (rows):", rows); // Ensure it logs an array of objects
    return rows;
    if (rows.length === 0) {
      console.log("No customers found.");
      return [];
    }
    console.log("Fetched customers:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("Error executing query:", error);
    return [];
  }
}

//a function to get a customer by id
async function getCustomerById(customer_id) {
  console.log("Searching for customer with ID:", customer_id); // Log the ID
  const query = `SELECT *
    FROM customer_identifier
    INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
    WHERE customer_identifier.customer_id = ?`;
  try {
    const rows = await db.query(query, [customer_id]);
    console.log("Query Results:", rows); // Log the raw query results
    return rows;
  } catch (error) {
    console.error("Error executing query:", error); // Log any errors
    return null;
  }
}
// a function to edit a customer
async function updateCustomer(customer) {
  // console.log("Editing customer");

  // SQL query to update `customer_identifier`
  const updateIdentifierQuery = `
    UPDATE customer_identifier
    SET customer_email = ?, customer_phone_number = ?
    WHERE customer_id = ?;
  `;

  // SQL query to update `customer_info`
  const updateInfoQuery = `
    UPDATE customer_info
    SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ?
    WHERE customer_id = ?;
  `;

  try {
    // Start a transaction

    // Update `customer_identifier`
    await db.query(updateIdentifierQuery, [
      customer.customer_email,
      customer.customer_phone_number,
      customer.customer_id,
    ]);

    // Update `customer_info`
    await db.query(updateInfoQuery, [
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
      customer.customer_id,
    ]);
    console.log("Customer updated successfully");
    return { success: true };
  } catch (error) {
    // Rollback transaction in case of error
    console.error("Error executing query:", error);
    return { success: false, error: error.message };
  }
}

// A function to delete a customer
// async function deleteCustomer(customer_id) {
//   console.log("Deleting customer with ID:", customer_id); // Log the ID
//   const query = `DELETE FROM customer_identifier WHERE customer_id = ?`;
//   try {
//     const rows = await db.query(query, [customer_id]);
//     console.log("Query Results:", rows); // Log the raw query results
//     return rows;
//   } catch (error) {
//     console.error("Error executing query:", error); // Log any errors
//     return null;
//   }
// }

async function deleteCustomer(customer_id) {
  console.log("Deleting customer with ID:", customer_id); // Log the ID
  const query = `DELETE FROM customer_identifier WHERE customer_id = ?`;
  try {
    const rows = await db.query(query, [customer_id]); // <-- remove [ ] destructuring
    console.log("Query Results:", rows); // Should now show affectedRows info
    if (rows.affectedRows === 0) {
      return null; // no customer deleted
    }
    return rows; // returns object with affectedRows
  } catch (error) {
    console.error("Error executing query:", error);
    return null;
  }
}


// a function rerun customer status
async function getCustomerStatus() {
  const query = `
    SELECT 
      SUM(CASE WHEN active_customer_status = 1 THEN 1 ELSE 0 END) AS activeCustomers,
      SUM(CASE WHEN active_customer_status = 0 THEN 1 ELSE 0 END) AS inactiveCustomers,
      COUNT(*) AS totalCustomers
    FROM customer_info
  `;

  try {
    const rows = await db.query(query);

    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    return null;
  }
}

// a function to get customer by email
async function getCustomerByEmail(customer_email) {
  const query = `
    SELECT *
    FROM customer_identifier
    INNER JOIN customer_info 
      ON customer_identifier.customer_id = customer_info.customer_id
    WHERE customer_identifier.customer_email = ?`;

  const rows = await db.query(query, [customer_email]);
  return rows;
}

// Export the functions
module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByEmail,
  updateCustomer,
  deleteCustomer,
  getCustomerStatus,
};
