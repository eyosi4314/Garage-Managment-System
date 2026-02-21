import React from "react";
import EmployeeMenu from "../../../components/Employee/EmployeeManu/EmployeeManu";
import EmployeeHistory from "../../../components/Employee/EmployeeTaskHistory/EmployeeTaskHisory";

function TaskHistory() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmployeeHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskHistory;
