// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module to do the password comparison
const bcrypt = require("bcrypt");
// Import the employee service to get employee by email
const employeeService = require("./employee.service");
// Import the customer service to get customer by email
const customerService = require("./customer.service");


// Handle employee login
async function logIn(employeeData) {
  try {
    let returnData = {}; // Object to be returned
    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email,
    );
  console.log(employee);
    
    if (employee.length === 0) {
      returnData = {
        status: "fail",
        message: "Employee does not exist",
      };
      return returnData;
    }
    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employee[0].employee_password_hashed,
    );
    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password",
      };
      return returnData;
    }
    returnData = {
      status: "success",
      data: employee[0],
    };
    return returnData;
  } catch (error) {
    console.log(error);
  }
}



// // Handle customer login
// async function logInCustomer(CustomerData) {
//   try {
//     let returnData = {}; // Object to be returned
//     const Customer = await customerService.getCustomerByEmail(
//       CustomerData.customer_email,
//     );
//     if (Customer.length === 0) {
//       returnData = {
//         status: "fail",
//         message: "Customer does not exist",
//       };
//       return returnData;
//     }
//     const passwordMatch = await bcrypt.compare(
//       CustomerData.customer_password,
//       Customer[0].customer_hash,
//     );
//     if (!passwordMatch) {
//       returnData = {
//         status: "fail",
//         message: "Incorrect password",
//       };
//       return returnData;
//     }
//     returnData = {
//       status: "success",
//       data: Customer[0],
//     };
//     return returnData;
//   } catch (error) {
//     console.log(error);
//   }
// }
async function logInCustomer(customerData) {
  try {
    let returnData = {};

    const customer = await customerService.getCustomerByEmail(
      customerData.customer_email,
    );

    if (customer.length === 0) {
      return {
        status: "fail",
        message: "Customer does not exist",
      };
    }

    const passwordMatch = await bcrypt.compare(
      customerData.customer_password,
      customer[0].customer_hash,
    );

    if (!passwordMatch) {
      return {
        status: "fail",
        message: "Incorrect password",
      };
    }

    return {
      status: "success",
      data: customer[0],
    };
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "Something went wrong",
    };
  }
}


// Export the function
module.exports = {
  logIn,
  logInCustomer,
};
