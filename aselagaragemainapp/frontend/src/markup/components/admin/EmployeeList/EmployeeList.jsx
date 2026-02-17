import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Toast,
  OverlayTrigger,
  Popover,
  Spinner,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import { format } from "date-fns";
import { useAuth } from "../../../../context/AuthContext";
import employeeService from "../../../../services/employee.service";
import { FaEdit, FaTrash, FaEye, FaPrint } from "react-icons/fa";
import "./EmployeeList.css";

const roleLabels = {
  1: "Employee",
  2: "Manager",
  3: "Admin",
};

const statusLabels = {
  1: "Active",
  0: "Inactive",
};

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const { employee, isAdmin } = useAuth();
  const token = employee ? employee.employee_token : null;

  // Fetch employees
  useEffect(() => {
    if (!token) return;

    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await employeeService.getAllEmployees(token);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        setEmployees(data.data || []);
        setApiError(false);
      } catch (err) {
        setApiError(true);
        if (err.message === "401") setApiErrorMessage("Please login again");
        else if (err.message === "403")
          setApiErrorMessage("You are not authorized to view this page");
        else setApiErrorMessage("Failed to load employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [token]);

  // Filter employees based on search
  useEffect(() => {
    if (searchQuery === "") setFilteredEmployees(employees);
    else {
      setFilteredEmployees(
        employees.filter((emp) =>
          [
            emp.employee_first_name,
            emp.employee_last_name,
            emp.employee_email,
            emp.employee_phone,
            roleLabels[emp.company_role_id],
            statusLabels[emp.active_employee],
          ]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        ),
      );
    }
  }, [searchQuery, employees]);

  // Pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Delete employee
  const handleConfirmDelete = async () => {
    try {
      await employeeService.deleteEmployee(employeeToDelete.employee_id, token);
      setEmployees(
        employees.filter((e) => e.employee_id !== employeeToDelete.employee_id),
      );
      setToastMessage("Employee deleted successfully");
      setToastVariant("success");
    } catch (err) {
      setToastMessage("Failed to delete employee");
      setToastVariant("danger");
    } finally {
      setShowToast(true);
      setShowDeleteConfirm(false);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // Print employee
  const handlePrint = (employee) => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(
      "<html><head><title>Employee</title></head><body>",
    );
    printWindow.document.write(`
      <h1>Employee Info</h1>
      <p><strong>Full Name:</strong> ${employee.employee_first_name} ${employee.employee_last_name}</p>
      <p><strong>Email:</strong> ${employee.employee_email}</p>
      <p><strong>Phone:</strong> ${employee.employee_phone}</p>
      <p><strong>Role:</strong> ${roleLabels[employee.company_role_id]}</p>
      <p><strong>Status:</strong> ${
        employee.active_employee === 1 ? "Active" : "Inactive"
      }</p>
      <p><strong>Added:</strong> ${format(
        new Date(employee.added_date),
        "MM-dd-yyyy | HH:mm",
      )}</p>
    `);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Popover
  const employeePopover = (employee) => (
    <Popover id={`popover-${employee.employee_id}`}>
      <Popover.Header as="h3">Employee Details</Popover.Header>
      <Popover.Body>
        <p>
          <strong>Full Name:</strong> {employee.employee_first_name}{" "}
          {employee.employee_last_name}
        </p>
        <p>
          <strong>Email:</strong> {employee.employee_email}
        </p>
        <p>
          <strong>Phone:</strong> {employee.employee_phone}
        </p>
        <p>
          <strong>Role:</strong> {roleLabels[employee.company_role_id]}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {employee.active_employee === 1 ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Added:</strong>{" "}
          {format(new Date(employee.added_date), "MM-dd-yyyy | HH:mm")}
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="employee-list">
      {loading ? (
        <Spinner animation="border" />
      ) : apiError ? (
        <h3>{apiErrorMessage}</h3>
      ) : (
        <>
          <div className="title-container">
            <h2 className="title">Employees</h2>
            <InputGroup className="search-bar-container">
              <FormControl
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </InputGroup>
          </div>

          <div className="table-wrapper">
            <Table striped bordered hover responsive className="compact-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td>
                      {employee.employee_first_name}{" "}
                      {employee.employee_last_name}
                    </td>
                    <td>{employee.employee_email}</td>
                    <td>{employee.employee_phone}</td>
                    <td>{roleLabels[employee.company_role_id]}</td>
                    <td>
                      {employee.active_employee === 1 ? "Active" : "Inactive"}
                    </td>
                    <td>
                      {isAdmin && (
                        <>
                          <Button
                            variant="warning"
                            className="me-2"
                            onClick={() => {}}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="danger"
                            className="me-2"
                            onClick={() => {
                              setEmployeeToDelete(employee);
                              setShowDeleteConfirm(true);
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </>
                      )}
                      <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={employeePopover(employee)}
                      >
                        <Button variant="info" className="me-2">
                          <FaEye />
                        </Button>
                      </OverlayTrigger>
                      <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => handlePrint(employee)}
                      >
                        <FaPrint />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
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

          {/* Delete Modal */}
          <Modal
            show={showDeleteConfirm}
            onHide={() => setShowDeleteConfirm(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this employee?
            </Modal.Body>
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

          {/* Toast */}
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
            className={`bg-${toastVariant}`}
          >
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </>
      )}
    </div>
  );
};

export default EmployeesList;
