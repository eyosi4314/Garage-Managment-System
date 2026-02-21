import React from "react";
import EmployeeMenu from "../../../components/Employee/EmployeeManu/EmployeeManu";
import Tasks from "../../../components/Employee/EmployeeTask/EmployeeTask";

function EmployeeTasks() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <Tasks />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeTasks;
