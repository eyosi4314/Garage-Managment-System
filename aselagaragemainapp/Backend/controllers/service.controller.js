// Import the employee service
const serviceService = require("../services/servic.service");

async function getCustomerServices(req, res, next) {
  try {
    const customerId = req.user.customerId; // Get the customer ID from the request user
    const services = await serviceService.getServicesByCustomerId(customerId);

    if (!services || services.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No services found for this customer",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: services,
      });
    }
  } catch (error) {
    console.error("Error fetching customer services:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch customer services",
    });
  }
}
async function getAllServices(req, res, next) {
  try {
    const services = await serviceService.getAllServices();

    if (!services || services.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No services found",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: services,
      });
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch services",
    });
  }
}

async function updateServiceController(req, res, next) {
  const serviceId = req.params.service_id;
  const serviceData = req.body;

  try {
    const success = await serviceService.updateService(serviceId, serviceData);

    if (success) {
      res
        .status(201)
        .json({ success: true, message: "Service updated successfully" });
    } else {
      res.status(404).json({ message: "Service not found or no changes made" });
    }
  } catch (error) {
    console.error("Error in updateServiceController:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the service" });
  }
}

async function deactivateService(req, res, next) {
  try {
    const service_id = req.params.id;
    console.log(service_id);
    if (!service_id) {
      return res.status(400).json({
        error: "Service ID is required!",
      });
    }
    const success = await serviceService.deactivateService(service_id);
    // console.log(success);
    if (success) {
      res
        .status(200)
        .json({ success: true, message: "Service deleted successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getServiceById(req, res, next) {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// async function to create a new service
async function createService(req, res, next) {
  try {
    const service = await serviceService.createService(req.body);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllServices,
  createService,
  getServiceById,
  updateServiceController,
  deactivateService,
  getCustomerServices,
};
