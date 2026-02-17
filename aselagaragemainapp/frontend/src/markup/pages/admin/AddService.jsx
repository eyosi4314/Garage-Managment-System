import React from "react";
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";
import AddServices from "../../components/admin/AddService/AddService";

function AddService() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddServices />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddService;
