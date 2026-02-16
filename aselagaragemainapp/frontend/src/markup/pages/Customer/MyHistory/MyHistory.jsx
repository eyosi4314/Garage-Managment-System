import React from "react";
import CustumerMenu from "../../../Components/CustomerPage/CustomerMenu/CustumerMenu";
import MyHistory from "../../../Components/CustomerPage/CustomerHistory/MyHistory";

function MyHistoryList() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <CustumerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <MyHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyHistoryList;
