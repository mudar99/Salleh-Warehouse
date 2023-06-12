import React from "react";
import List from "../list/List";
import './purchase-orders.scss'
const Purchases = () => {
  return (
    <div>
      <List component="PurshasesDataTable" />
    </div>
  );
};

export default Purchases;
