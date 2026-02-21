import React from "react";
import ManagerMenu from "../../components/ManagerMenu/ManagerMenu";
import CustomersList from "../../components/admin/CustomerList/CustomerList";

function CustomersManager() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomersList />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomersManager;
