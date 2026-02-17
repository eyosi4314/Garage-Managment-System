import React, { useState, useEffect } from "react";
import {
  Table,
  Spinner,
  Pagination,
  Button,
  Modal,
  Toast,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../../../../context/AuthContext";
import customerService from "../../../../services/customer.service";
import { FaEdit, FaTrashAlt, FaEye, FaPrint } from "react-icons/fa";
import "./CustomerList.css";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const navigate = useNavigate();

  // Fetch customers
  useEffect(() => {
    if (!token) return;

    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const data = await customerService.getAllCustomers(token);
        setCustomers(data);
        setApiError(false);
      } catch (err) {
        console.error(err);
        setApiError(true);
        setApiErrorMessage("Failed to load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token]);

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer,
  );
  const totalPages = Math.ceil(customers.length / customersPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Delete
  const handleConfirmDelete = async () => {
    try {
      await customerService.deleteCustomer(customerToDelete.customer_id, token);
      setCustomers(
        customers.filter((c) => c.customer_id !== customerToDelete.customer_id),
      );
      setToastMessage("Customer deleted successfully");
      setToastVariant("success");
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to delete customer");
      setToastVariant("danger");
    } finally {
      setShowToast(true);
      setShowDeleteConfirm(false);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // Print
  const handlePrint = (customer) => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(
      "<html><head><title>Customer</title></head><body>",
    );
    printWindow.document.write(`
      <h1>Customer Info</h1>
      <p><strong>Full Name:</strong> ${customer.customer_first_name} ${customer.customer_last_name}</p>
      <p><strong>Email:</strong> ${customer.customer_email}</p>
      <p><strong>Phone:</strong> ${customer.customer_phone_number}</p>
      <p><strong>Status:</strong> ${
        customer.active_customer_status === 1 ? "Active" : "Inactive"
      }</p>
    `);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Popover
  const customerPopover = (customer) => (
    <Popover id={`popover-${customer.customer_id}`}>
      <Popover.Header as="h3">Customer Details</Popover.Header>
      <Popover.Body>
        <p>
          <strong>Full Name:</strong> {customer.customer_first_name}{" "}
          {customer.customer_last_name}
        </p>
        <p>
          <strong>Email:</strong> {customer.customer_email}
        </p>
        <p>
          <strong>Phone:</strong> {customer.customer_phone_number}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {customer.active_customer_status === 1 ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {format(new Date(customer.customer_added_date), "MM-dd-yyyy | HH:mm")}
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="customer-list">
      {loading ? (
        <Spinner animation="border" />
      ) : apiError ? (
        <h3>{apiErrorMessage}</h3>
      ) : (
        <>
          <h2>Customers</h2>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_id}</td>
                  <td>
                    {customer.customer_first_name} {customer.customer_last_name}
                  </td>
                  <td>{customer.customer_email}</td>
                  <td>{customer.customer_phone_number}</td>
                  <td>
                    {customer.active_customer_status === 1
                      ? "Active"
                      : "Inactive"}
                  </td>
                  <td>
                    {/* EDIT -> Navigate to edit page */}
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() =>
                        navigate(`/admin/customer/${customer.customer_id}`)
                      }
                    >
                      <FaEdit />
                    </Button>

                    {/* DELETE */}
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={() => {
                        setCustomerToDelete(customer);
                        setShowDeleteConfirm(true);
                      }}
                    >
                      <FaTrashAlt />
                    </Button>

                    {/* DETAILS POPUP */}
                    <OverlayTrigger
                      trigger="click"
                      placement="left"
                      overlay={customerPopover(customer)}
                    >
                      <Button variant="info" className="me-2">
                        <FaEye />
                      </Button>
                    </OverlayTrigger>

                    {/* PRINT */}
                    <Button
                      variant="secondary"
                      onClick={() => handlePrint(customer)}
                    >
                      <FaPrint />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* PAGINATION */}
          <Pagination>
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}

      {/* DELETE MODAL */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* TOAST */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className={`bg-${toastVariant}`}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default CustomersList;
