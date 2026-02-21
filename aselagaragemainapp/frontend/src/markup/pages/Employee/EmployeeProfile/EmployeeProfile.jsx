import React from "react";
import EmployeeMenu from "../../../components/Employee/EmployeeManu/EmployeeManu";
import EmpProfile from "../../../components/Employee/EmployeeProfile/EmployeeProfile";

function EmployeePofile() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmpProfile />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeePofile;
