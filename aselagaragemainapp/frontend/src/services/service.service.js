// import .env file 
const api_url = import.meta.env.VITE_API_URL;


// add service service async function
export const addService = async (serviceData, token) => {
  console.log(serviceData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
    body: JSON.stringify(serviceData),
  };
  const response = await fetch(
    `${api_url}/api/service`, // Use the environment variable for the API URL
    requestOptions,
  );
  return response;
};
// src/services/service.service.js

export const getAllServices = async (token) => {
  try {
    const response = await fetch(`${api_url}/api/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token, // Include the token if needed
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
//update service service
export const updateService = async (service_id, serviceData, token) => {
  try {
    const response = await fetch(
      `${api_url}/api/service/${service_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(serviceData),
      },
    );

    // Check if the response is not OK
    if (!response.ok) {
      const result = await response.json(); // Parse JSON response
      throw new Error(result.message || "Failed to update service");
    }

    // If response is OK, parse and return the result
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating service:", {
      message: error.message,
      service_id,
      serviceData,
    }); // Enhanced logging with additional context
    throw error; // Re-throw the error after logging it
  }
};

const serviceService = {
  addService,
  getAllServices,
  updateService,
};

export default serviceService;
