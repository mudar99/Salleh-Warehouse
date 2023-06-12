import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GetChildCatAPI, GetRootCatAPI } from "../../API";
import Cookies from "universal-cookie";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import LoadingFS from "../components/loading/LoadingFS";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { GetCategories } from "../../redux/API/categorySlice";

const CategorisView = (props) => {
  const cookie = new Cookies();
  const token = cookie.get("jwt_store");
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const dispatch = useDispatch();
  let nodes = [];
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [capacity, setCapacity] = useState(2);
  const [counter, setCounter] = useState(1);
  const [loadPlace, setLoadPlace] = useState();
  const { data, totalItems } = useSelector((state) => state.categories);
  // console.log(data);
  // let [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = {
      size: basicRows,
      page: currentPage,
      capacity: capacity,
      id: 1,
      load: 2,
    };
    dispatch(GetCategories(info));
  };

  useEffect(() => {
    let info = {
      size: basicRows,
      page: currentPage,
      capacity: capacity,
      id: 1,
      load: 2,
    };
    dispatch(GetCategories(info));
  }, []);

  const onSelect = (event) => {
    let id = event.node.data.id;
  };

  const acitonBodyTemplate = (rowData) => {
    if (rowData.children.length !== 0) {
      return (
        <div className="text-center">
          <Button
            className="p-button-rounded p-button-text p-button-success"
            dir="ltr"
            icon="pi pi-spinner"
            severity="success"
            onClick={() => {
              let info;
              let c;
              let co;
              // console.log(rowData);
              setLoadPlace(rowData.data.name);
              if (loadPlace === rowData.data.name || loadPlace === undefined) {
                c = false;
              } else {
                c = true;
              }
              if (c) {
                setCounter(2);
                co = 2;
                info = {
                  size: basicRows,
                  page: currentPage,
                  capacity: capacity,
                  id: rowData.key,
                  load: co,
                };
              } else {
                setCounter(counter + 1);
                co = counter + 1;
                info = {
                  size: basicRows,
                  page: currentPage,
                  capacity: capacity,
                  id: rowData.key,
                  load: co,
                };
              }
              dispatch(GetCategories(info));
            }}
          />
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-text p-button-success"
            aria-label="Submit"
            onClick={() => props.createState("C", rowData)}
          />
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-text p-button-success"
            aria-label="Submit"
            onClick={() => props.createState("C", rowData)}
          />
        </div>
      );
    }
  };
  return (
    <div className=" ">
      <div className="treetable">
        {loading && <LoadingFS />}
        <TreeTable
          showGridlines
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          onSelect={onSelect}
          selectionMode="single"
          selectionKeys={selectedNodeKey}
          onSelectionChange={(e) => setSelectedNodeKey(e.value)}
        >
          <Column
            bodyClassName={(rowData) =>
              rowData.category_id === null && "parent"
            }
            field="name"
            header="الاسم"
            expander
          ></Column>
          <Column
            bodyClassName={(rowData) =>
              rowData.category_id === null && "parent"
            }
            field="created_at"
            header="تاريخ الإنشاء"
          ></Column>
          <Column
            bodyClassName={(rowData) =>
              rowData.category_id === null && "parent"
            }
            field="description"
            header="الوصف"
          ></Column>
          <Column
            bodyClassName={(rowData) =>
              rowData.category_id === null && "parent"
            }
            header="حدث"
            body={acitonBodyTemplate}
          ></Column>
        </TreeTable>

        <Paginator
          first={basicFirst}
          rows={basicRows}
          totalRecords={totalItems}
          onPageChange={onBasicPageChange}
        ></Paginator>
      </div>
    </div>
  );
};

export default CategorisView;
