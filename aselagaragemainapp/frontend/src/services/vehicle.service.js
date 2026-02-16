import axios from "axios";

// Import from the env
const api_url = import.meta.env.VITE_API_URL;



// A function to send a POST request to add a new vehicle
const createVehicle = async (formData, token) => {
  try {
    const response = await axios.post(
      `${api_url}/api/vehicle`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      },
    );

    return response.data; // Axios returns the data directly
  } catch (error) {
    // Handle error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        error.response.data || "An error occurred while creating the vehicle",
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(
        error.message || "An error occurred while creating the vehicle",
      );
    }
  }
};

// A function to send a PUT request to update an existing vehicle
const updateVehicle = async (formData, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};

// A function to send a DELETE request to remove a vehicle by ID
const deleteVehicle = async (vehicleId, token) => {
  const url = `${api_url}/api/vehicle/${vehicleId}`;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text(); // Read the error message
      throw new Error(errorText);
    }

    return response.json(); // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};

// A function to send a GET request to retrieve all vehicles
const getAllVehicles = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/vehicles`, requestOptions);
  return response;
};

// A function to send a GET request to retrieve vehicles by customer name
const getVehicleByCustomerId = async (customer_id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/vehicles/customer/${customer_id}`,
    requestOptions,
  );
  console.log(response);
  return response;
};

// Export all the functions
const vehicleService = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleByCustomerId,
};

export default vehicleService;
