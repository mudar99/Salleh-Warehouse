import React from "react";
import "./list.scss";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Datatable from "../components/datatable/Datatable";

const List = (props) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          header={props.header}
          headers={props.headers}
          data={props.data}
        />
      </div>
    </div>
  );
};

export default List;
