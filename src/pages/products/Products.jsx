import React, { useState } from "react";
import List from "../list/List";
import { Dialog } from "primereact/dialog";
import { AddProduct } from "./AddProduct";
import { UpdateProduct } from "./UpdateProduct";

const Products = () => {
  const [updateVisible, setUpdateVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [data, setData] = useState("");
  const callback = (e, rowData) => {
    setData(rowData);
    switch (e) {
      case "U":
        setUpdateVisible(true);
        break;
      case "C":
        setCreateVisible(true);
        break;
      case "D":
        break;
      default:
        break;
    }
  };
  return (
    <div className="products">
      <List visibleState={callback} component="ProductsDataTable" />
      <Dialog
        visible={createVisible}
        style={{ width: "50vw" }}
        onHide={() => setCreateVisible(false)}
        resizable
        appendTo={"self"}
      >
        <AddProduct visibleState={(e) => setCreateVisible(e)} />
      </Dialog>
      <Dialog
        visible={updateVisible}
        style={{ width: "50vw" }}
        onHide={() => setUpdateVisible(false)}
        resizable
        appendTo={"self"}
      >
        <UpdateProduct data={data} visibleState={(e) => setUpdateVisible(e)} />
      </Dialog>
    </div>
  );
};

export default Products;
