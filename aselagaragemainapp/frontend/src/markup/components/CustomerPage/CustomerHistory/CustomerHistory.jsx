// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Spinner,
//   Alert,
//   Card,
//   ListGroup,
//   Button,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import { FaEdit } from "react-icons/fa";
// import { useAuth } from "../../../../Contexts/AuthContext";
// function MyOrders() {
//   const { orderId } = useParams(); // Retrieve order ID from the URL
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editableField, setEditableField] = useState(null);
//   const [formData, setFormData] = useState({});

//   const { isLogged, employee } = useAuth();
//   const cutomerId = employee.customer_id;
//   // useEffect(() => {
//   //   console.log(cutomerId);

//   //   const fetchOrderDetails = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `http://localhost:5000/api/order/customer/${cutomerId}`
//   //       );
//   //       console.log(response.data);
//   //       if (!response.data) {
//   //         throw new Error("Failed to fetch order details");
//   //       } else {
//   //         setOrderDetails(response.data);
//   //       }
//   //     } catch (err) {
//   //       setError("Failed to fetch order details");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchOrderDetails();
//   // }, [orderId]);
//   useEffect(() => {
//     if (cutomerId) {
//       const fetchOrderDetails = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/order/customer/${cutomerId}`
//           );
//           console.log(response.data);
//           if (!response.data) {
//             throw new Error("Failed to fetch order details");
//           } else {
//             setOrderDetails(response.data);
//           }
//         } catch (err) {
//           setError("Failed to fetch order details");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchOrderDetails();
//     }
//   }, [cutomerId]);
//   const handleEditClick = (field, value) => {
//     setEditableField(field);
//     setFormData({ [field]: value });
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/order/${orderId}`, formData);
//       // Refresh order details after successful update
//       const response = await axios.get(
//         `http://localhost:5000/api/order/${orderId}`
//       );
//       setOrderDetails(response.data);
//     } catch (err) {
//       setError("Failed to update order details");
//     } finally {
//       setShowModal(false);
//     }
//   };

//   return (
//     <div>
//       <Card className="mt-4">
//         <Card.Header>
//           <h4>Order Details</h4>
//         </Card.Header>
//         <Card.Body>
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//               <p>Loading order details...</p>
//             </div>
//           ) : error ? (
//             <Alert variant="danger">{error}</Alert>
//           ) : (
//             orderDetails && (
//               <div>
//                 <Card.Title>Order ID: {orderDetails.orderId}</Card.Title>
//                 {/* <ListGroup>
//                   <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5>Customer Information</h5>
//                       <p>
//                         <strong>Name:</strong> {orderDetails.customer.firstName}{" "}
//                         {orderDetails.customer.lastName}
//                       </p>
//                       <p>
//                         <strong>Email:</strong> {orderDetails.customer.email}
//                       </p>
//                       <p>
//                         <strong>Phone Number:</strong>{" "}
//                         {orderDetails.customer.phoneNumber}
//                       </p>
//                     </div>
//                     <Button
//                       variant="link"
//                       onClick={() =>
//                         handleEditClick("customer", orderDetails.customer)
//                       }
//                     >
//                       <FaEdit />
//                     </Button>
//                   </ListGroup.Item>
//                   <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5>Vehicle Details</h5>
//                       <p>
//                         <strong>Make:</strong> {orderDetails.vehicle.make}
//                       </p>
//                       <p>
//                         <strong>Model:</strong> {orderDetails.vehicle.model}
//                       </p>
//                       <p>
//                         <strong>Year:</strong> {orderDetails.vehicle.year}
//                       </p>
//                       <p>
//                         <strong>Color:</strong> {orderDetails.vehicle.color}
//                       </p>
//                       <p>
//                         <strong>Mileage:</strong> {orderDetails.vehicle.mileage}
//                       </p>
//                     </div>
//                     <Button
//                       variant="link"
//                       onClick={() =>
//                         handleEditClick("vehicle", orderDetails.vehicle)
//                       }
//                     >
//                       <FaEdit />
//                     </Button>
//                   </ListGroup.Item>
//                   <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5>Order Information</h5>
//                       <p>
//                         <strong>Order Date:</strong>{" "}
//                         {new Date(orderDetails.orderDate).toLocaleDateString()}
//                       </p>
//                       <p>
//                         <strong>Total Price:</strong> ${orderDetails.totalPrice}
//                       </p>
//                       <p>
//                         <strong>Estimated Completion Date:</strong>{" "}
//                         {new Date(
//                           orderDetails.estimatedCompletionDate
//                         ).toLocaleDateString()}
//                       </p>
//                       <p>
//                         <strong>Customer Notes:</strong>{" "}
//                         {orderDetails.customerNotes}
//                       </p>
//                       <p>
//                         <strong>Internal Notes:</strong>{" "}
//                         {orderDetails.internalNotes}
//                       </p>
//                     </div>
//                     <Button
//                       variant="link"
//                       onClick={() => handleEditClick("order", orderDetails)}
//                     >
//                       <FaEdit />
//                     </Button>
//                   </ListGroup.Item>
//                   <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5>Employee Details</h5>
//                       <p>
//                         <strong>Name:</strong> {orderDetails.employee.firstName}{" "}
//                         {orderDetails.employee.lastName}
//                       </p>
//                       <p>
//                         <strong>Email:</strong> {orderDetails.employee.email}
//                       </p>
//                     </div>
//                     <Button
//                       variant="link"
//                       onClick={() =>
//                         handleEditClick("employee", orderDetails.employee)
//                       }
//                     >
//                       <FaEdit />
//                     </Button>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <h5>Services</h5>
//                     <ul>
//                       {orderDetails.services.map((service) => (
//                         <li key={service.serviceId}>
//                           <div className="d-flex justify-content-between align-items-center">
//                             <div>
//                               <p>
//                                 <strong>Service Name:</strong>{" "}
//                                 {service.serviceName}
//                               </p>
//                               <p>
//                                 <strong>Description:</strong>{" "}
//                                 {service.serviceDescription}
//                               </p>
//                               <p>
//                                 <strong>Price:</strong> ${service.servicePrice}
//                               </p>
//                               <p>
//                                 <strong>Completed:</strong>{" "}
//                                 {service.serviceCompleted === 1 ? "Yes" : "No"}
//                               </p>
//                             </div>
//                             <Button
//                               variant="link"
//                               onClick={() =>
//                                 handleEditClick("service", service)
//                               }
//                             >
//                               <FaEdit />
//                             </Button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </ListGroup.Item>
//                 </ListGroup> */}
//               </div>
//             )
//           )}
//         </Card.Body>
//       </Card>

//       {/* Modal for Editing */}
//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit {editableField}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>
//             {editableField === "customer" && (
//               <>
//                 <Form.Group controlId="formCustomerName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={`${formData.firstName || ""} ${
//                       formData.lastName || ""
//                     }`}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formCustomerEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formCustomerPhoneNumber">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="phoneNumber"
//                     value={formData.phoneNumber || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </>
//             )}
//             {editableField === "vehicle" && (
//               <>
//                 <Form.Group controlId="formVehicleMake">
//                   <Form.Label>Make</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="make"
//                     value={formData.make || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formVehicleModel">
//                   <Form.Label>Model</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="model"
//                     value={formData.model || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formVehicleYear">
//                   <Form.Label>Year</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="year"
//                     value={formData.year || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formVehicleColor">
//                   <Form.Label>Color</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="color"
//                     value={formData.color || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formVehicleMileage">
//                   <Form.Label>Mileage</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="mileage"
//                     value={formData.mileage || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </>
//             )}
//             {editableField === "order" && (
//               <>
//                 <Form.Group controlId="formOrderTotalPrice">
//                   <Form.Label>Total Price</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="totalPrice"
//                     value={formData.totalPrice || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formOrderCustomerNotes">
//                   <Form.Label>Customer Notes</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     name="customerNotes"
//                     value={formData.customerNotes || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formOrderInternalNotes">
//                   <Form.Label>Internal Notes</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     name="internalNotes"
//                     value={formData.internalNotes || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </>
//             )}
//             {editableField === "employee" && (
//               <>
//                 <Form.Group controlId="formEmployeeName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={`${formData.firstName || ""} ${
//                       formData.lastName || ""
//                     }`}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formEmployeeEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </>
//             )}
//             {editableField === "service" && (
//               <>
//                 <Form.Group controlId="formServiceName">
//                   <Form.Label>Service Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="serviceName"
//                     value={formData.serviceName || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formServiceDescription">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     name="serviceDescription"
//                     value={formData.serviceDescription || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formServicePrice">
//                   <Form.Label>Price</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="servicePrice"
//                     value={formData.servicePrice || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formServiceCompleted">
//                   <Form.Label>Completed</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="serviceCompleted"
//                     value={formData.serviceCompleted || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </>
//             )}
//             <Button variant="primary" type="submit">
//               Save Changes
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default MyOrders;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Spinner,
  Alert,
  Card,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../../../../context/AuthContext";

const api_url = import.meta.env.VITE_API_URL;

function MyOrders() {
  const { orderId } = useParams(); // Retrieve order ID from the URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLogged, employee } = useAuth();
  const customerId = employee.customer_id;

  useEffect(() => {
    if (customerId) {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(
            `${api_url}/api/order/customer/${customerId}`,
          );
          if (!response.data) {
            throw new Error("Failed to fetch order details");
          } else {
            setOrderDetails(response.data);
          }
        } catch (err) {
          setError("Failed to fetch order details");
        } finally {
          setLoading(false);
        }
      };
      fetchOrderDetails();
    }
  }, [customerId]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      {orderDetails && orderDetails.length > 0 ? (
        orderDetails.map((order) => (
          <Card className="mt-4" key={order.orderId}>
            <Card.Header>
              <h4>Your History</h4>
            </Card.Header>
            <Card.Body>
              {/* <h5>Customer Information</h5>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Name:</strong> {order.customer.firstName}{" "}
                  {order.customer.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {order.customer.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone Number:</strong> {order.customer.phoneNumber}
                </ListGroup.Item>
              </ListGroup>

              <h5 className="mt-3">Vehicle Information</h5>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Make:</strong> {order.vehicle.make}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Model:</strong> {order.vehicle.model}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Year:</strong> {order.vehicle.year}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Color:</strong> {order.vehicle.color}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Mileage:</strong> {order.vehicle.mileage}
                </ListGroup.Item>
              </ListGroup>

              <h5 className="mt-3">Order Information</h5>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Total Price:</strong> ${order.orderInfo.totalPrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Estimated Completion Date:</strong>{" "}
                  {new Date(
                    order.orderInfo.estimatedCompletionDate
                  ).toLocaleDateString()}
                </ListGroup.Item>
              </ListGroup> */}

              <h5 className="mt-3">Service Information</h5>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Service Name:</strong> {order.services.serviceName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong>{" "}
                  {order.services.serviceDescription}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> ${order.services.servicePrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Service Completed:</strong>{" "}
                  {order.services.serviceCompleted ? "Yes" : "No"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;
