import React, { useEffect, useRef, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import LoadingFS from "../components/loading/LoadingFS";
import "../../style/datatable.scss";
import { showInfo, showSuccess } from "../../ToastService";
import { confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { DeleteProduct, GetProducts } from "../../redux/API/productSlice";
import { Paginator } from "primereact/paginator";
import { local } from "../../API";
import { isArabic } from "../../utils/langType";

const ProductsDataTable = (props) => {
  const dispatch = useDispatch();
  const { loading, data, totalItems } = useSelector((state) => state.products);
  const toast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);

  useEffect(() => {
    let info = { size: basicRows, page: currentPage };
    dispatch(GetProducts(info));
  }, []);
  const headers = [
    "اسم المنتج",
    "تاريخ الإضافة",
    "السعر",
    "الكمية",
    "البلد المصنع",
    "وصف",
    "صورة المنتج",
    "حدث",
  ];
  const acitonBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-success"
          aria-label="Submit"
          onClick={() => props.updateState("U", rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          aria-label="Submit"
          onClick={(event) => {
            confirmPopup({
              target: event.currentTarget,
              message: "هل تود حذف هذا المنتج؟",
              header: "تاكيد",
              icon: "pi pi-info-circle",
              acceptLabel: "تأكيد",
              rejectLabel: "إلغاء",
              acceptClassName: "p-button-danger",
              rejectClassName: "p-button-text",
              accept: () => {
                dispatch(DeleteProduct(rowData.id)).then((res) => {
                  console.log(res);
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    // dispatch(GetProducts());
                    return;
                  }
                });
              },
              reject: () => {
                showInfo("تم الإلغاء", toast);
              },
              appendTo: document.querySelector(".datatable"),
            });
          }}
        />
      </>
    );
  };
  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { size: basicRows, page: currentPage };
    dispatch(GetProducts(info));
  };
  return (
    <div className="datatable">
      {loading && <LoadingFS />}
      <div className="card">
        <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column align="center" header={headers[0]} field="name"></Column>
          <Column
            align="center"
            header={headers[1]}
            field="created_at"
          ></Column>
          <Column align="center" header={headers[2]} field={"price"}></Column>
          <Column align="center" header={headers[3]} field="quantity"></Column>
          <Column align="center" header={headers[4]} field="made"></Column>
          <Column
            alignHeader="center"
            bodyClassName={(rowData) => {
              return isArabic(rowData.description) ? "arabic" : "english";
            }}
            header={headers[5]}
            field="description"
          ></Column>
          <Column
            align="center"
            header={headers[6]}
            body={(rowData) => {
              return (
                <img
                  src={local + rowData.image_path}
                  style={{ width: "100px" }}
                />
              );
            }}
          ></Column>
          <Column
            align="center"
            header={headers[7]}
            field="action"
            body={acitonBodyTemplate}
          ></Column>
        </DataTable>

        <Paginator
          first={basicFirst}
          rows={basicRows}
          totalRecords={totalItems}
          onPageChange={onBasicPageChange}
        ></Paginator>
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default ProductsDataTable;
