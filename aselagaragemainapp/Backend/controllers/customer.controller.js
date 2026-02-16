const customerService = require("../services/customer.service");
// create the add customer controller
async function createCustomer(req, res, next) {
  const customerExists = await customerService.checkIfCustomerExists(
    req.body.customer_email,
  );
  if (customerExists) {
    return res.status(400).json({ error: "Customer already exists" });
  } else {
    try {
      // Get the customer data from the request body
      const customerData = req.body;
      // Call the createCustomer method from the customer service
      const customer = await customerService.createCustomer(customerData);
      if (!customer) {
        return res.status(400).json({ error: "Customer not created" });
      } else {
        return res.status(201).json({
          message: "Customer created successfully",
          success: "true",
          customer_id: customer,
        });
      }
    } catch (error) {
      // Send the error as a response with a more descriptive message
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An error occurred while creating the customer.",
      });
    }
  }
}

//create a function to get all customers
async function getAllCustomers(req, res, next) {
  try {
    //call the getAllCustomers method from the customer service
    const customers = await customerService.getAllCustomers();
    //send the customers as a response
    res.status(200).json(customers);
  } catch (error) {
    //send the error as a response
    res
      .status(401)
      .json({ error: "Unauthorized", message: "Authentication invalid" });
  }
}
//create a function to get a customer by id
async function getCustomerById(req, res, next) {
  const { id } = req.params; // Assuming ID is passed as a URL parameter
  console.log("Fetching customer with ID:", id); // Log the ID
  try {
    const customer = await customerService.getCustomerById(id);
    console.log("Customer found:", customer); // Log the customer object
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error); // Log any errors
    res.status(500).json({ error: "Internal server error" });
  }
}

//create a function to update a customer
async function updateCustomer(req, res, next) {
  const { id } = req.params;
  const customerData = req.body;
  console.log("Updating customer with ID:", id); // Log the ID
  try {
    const customer = await customerService.updateCustomer(customerData, id);
    console.log("Customer updated:", customer); // Log the updated customer object
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error); // Log any errors
    res.status(500).json({ error: "Internal server error" });
  }
}

//create a function to delete a customer
async function deleteCustomer(req, res, next) {
  const { id } = req.params;
  console.log("Deleting customer with ID:", id); // Log the ID
  try {
    const customer = await customerService.deleteCustomer(id);
    console.log("Customer deleted:", customer); // Log the deleted customer object
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error); // Log any errors
    res.status(500).json({ error: "Internal server error" });
  }
}
// create a functuon return customer status
async function getCustomerByStatus(req, res, next) {
  try {
    const status = await customerService.getCustomerStatus();
    if (status) {
      res.status(200).json(status);
    } else {
      res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
//export the createCustomer function
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerByStatus,
};
