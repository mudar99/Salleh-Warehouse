import React from "react";
import "./list.scss";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import ProductsDataTable from "../products/ProductsDataTable";
import CategorisView from "../categories/CategorisView";
import ProfileContent from "../profile/ProfileContent";
import Settings from "../settings/Settings";
 
const List = (props) => {
  const visibleCallBack = (e, rowData) => {
    // switch (e) {
    //   case "U":
    //     props.updateState(e);
    //     break;
    //   case "C":
    //     props.createState(e);
    //   case "D":
    //     break;
    //   default:
    //     break;
    // }
    props.visibleState(e, rowData);
  };
  const switchComponent = () => {
    // console.log(props.component);
    switch (props.component) {
      case "ProductsDataTable":
        return <ProductsDataTable updateState={visibleCallBack} />;
      case "CategorisView":
        return <CategorisView createState={visibleCallBack} />;
      case "ProfileContent":
        return <ProfileContent />;
        return;
      default:
        return;
    }
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Settings />
        {switchComponent()}
      </div>
    </div>
  );
};

export default List;
