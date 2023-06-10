import React, { useState } from "react";
import List from "../list/List";
import { Dialog } from "primereact/dialog";
import AddComplaint from "./AddComplaint";

const Complaints = () => {
  const [addVisible, setAddVisible] = useState();
  const [basicRows, setBasicRows] = useState();
  const callback = (e, rowData) => {
    setAddVisible(e);
    setBasicRows(rowData);
  };
  return (
    <div>
      <List visibleState={callback} component="ComplaintsDataTable" />
      <Dialog
        visible={addVisible}
        style={{ width: "50vw" }}
        onHide={() => setAddVisible(false)}
        resizable
        appendTo={"self"}
        header="إضافة شكوى"
      >
        <AddComplaint
          basicRows={basicRows}
          visibleState={(e) => setAddVisible(e)}
        />
      </Dialog>
    </div>
  );
};

export default Complaints;
