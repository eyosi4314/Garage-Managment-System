import axios from "../Axios/Axios";
const api_url = import.meta.env.VITE_API_URL;

const createCustomer = async (formData, token) => {
  console.log("Form data:", formData);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.post(`/customer`, formData, requestOptions);
    return response.data; // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

// A function to send a GET request to retrieve all customers
const getAllCustomers = async (token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.get(`/customers`, requestOptions);
    console.log(response.data);
    return response.data; // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

// A function to send a GET request to retrieve a customer by ID
const getCustomerById = async (customer_id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/customer/${customer_id}`,
    requestOptions,
  );
  return response;
};

// A function to send a PUT request to update a customer
const updateCustomer = async (formData, token) => {
  const url = `/customer/${formData.customer_id}`;

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.put(url, formData, requestOptions);
    return response.data; // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

// A function to send a DELETE request to delete a customer by ID
const deleteCustomer = async (customerId, token) => {
  const url = `/customer/${customerId}`;

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
  };

  try {
    const response = await axios.delete(url, requestOptions);
    return response.data; // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

// Export all the functions
const customerService = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
};

export default customerService;
