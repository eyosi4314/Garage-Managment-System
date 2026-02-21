import React from "react";
import CustumerMenu from "../../../components/CustomerPage/CustomerMenu/CustomerMenu";
import MyProfile from "../../../components/CustomerPage/CustomerProfile/CustomerProfile";

function MyProfileList() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <CustumerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <MyProfile />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfileList;
