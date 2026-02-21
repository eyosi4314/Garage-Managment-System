import React from "react";
import ManagerMenu from "../../components/ManagerMenu/ManagerMenu";
import ServiceList from "../../components/admin/ServiceList/ServiceList";
function AddServiceManager() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ServiceList />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddServiceManager;
