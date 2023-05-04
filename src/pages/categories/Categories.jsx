import React, { useState } from "react";
import List from "../list/List";
import "./categories.scss";
import { Dialog } from "primereact/dialog";
import { AddProduct } from "../products/AddProduct";
const Categories = () => {
  const [createVisible, setCreateVisible] = useState(false);
  const [data, setData] = useState("");

  const callback = (e, rowData) => {
    console.log(rowData);
    setData(rowData);
    switch (e) {
      case "C":
        setCreateVisible(true);
        break;
      default:
        break;
    }
  };
  return (
    <div className="categories">
      <List visibleState={callback} component="CategorisView" />

      <Dialog
        visible={createVisible}
        style={{ width: "50vw" }}
        onHide={() => setCreateVisible(false)}
        resizable
        appendTo={"self"}
      >
        <AddProduct data={data} visibleState={(e) => setCreateVisible(e)} />
      </Dialog>
    </div>
  );
};

export default Categories;
