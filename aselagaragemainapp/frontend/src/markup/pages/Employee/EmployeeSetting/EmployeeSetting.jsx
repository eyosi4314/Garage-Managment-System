import React from "react";
import EmployeeMenu from "../../../components/Employee/EmployeeManu/EmployeeManu";
import EmpSetting from "../../../components/Employee/EmployeeSetting/EmployeeSetting";
function EmployeeSetting() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmpSetting />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeSetting;
