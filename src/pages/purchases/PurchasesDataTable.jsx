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
import { Paginator } from "primereact/paginator";
import { local } from "../../API";
import {
  AcceptPurshaseOrder,
  GetAcceptedPurchases,
  GetRejectedPurchases,
  GetWaitingPurchases,
  RejectPurchaseOrder,
} from "../../redux/API/purchases/purchaseSlice";
import { Dropdown } from "primereact/dropdown";

const PurchasesDataTable = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { label: "المقبولة", value: "accepted" },
    { label: "المرفوضة", value: "rejected" },
    { label: "المعلّقة", value: "waiting" },
  ];
  const handleSelect = (e) => {
    setSelectedOption(e.value);
  };
  const dispatch = useDispatch();
  const { data, loading, btnLoading, totalItems } = useSelector(
    (state) => state.purchases
  );
  const toast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);

  useEffect(() => {
    let info = { size: basicRows, page: currentPage };
    switch (selectedOption) {
      case "accepted":
        dispatch(GetAcceptedPurchases(info));
        break;
      case "rejected":
        dispatch(GetRejectedPurchases(info));
        break;
      case "waiting":
        dispatch(GetWaitingPurchases(info));
        break;
      default:
        break;
    }
    console.log(selectedOption);
  }, [selectedOption]);
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
          icon="pi pi-check"
          rounded
          text
          severity="success"
          aria-label="Cancel"
          onClick={(event) => {
            confirmPopup({
              target: event.currentTarget,
              message: "هل تود الموافقة على طلب الشراء؟",
              header: "تاكيد",
              icon: "pi pi-info-circle",
              acceptLabel: "تأكيد",
              rejectLabel: "إلغاء",
              acceptClassName: "p-button-danger",
              rejectClassName: "p-button-text",
              accept: () => {
                dispatch(AcceptPurshaseOrder(rowData.id)).then((res) => {
                  console.log(res);
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    // dispatch(GetProducts(info));
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
        <Button
          icon="pi pi-times"
          rounded
          text
          severity="danger"
          aria-label="Cancel"
          onClick={(event) => {
            confirmPopup({
              target: event.currentTarget,
              message: "هل تود رفض طلب الشراء؟",
              header: "تاكيد",
              icon: "pi pi-info-circle",
              acceptLabel: "تأكيد",
              rejectLabel: "إلغاء",
              acceptClassName: "p-button-danger",
              rejectClassName: "p-button-text",
              accept: () => {
                dispatch(RejectPurchaseOrder(rowData.id)).then((res) => {
                  console.log(res);
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    // dispatch(GetProducts());
                    setSelectedOption(selectedOption);
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
    // dispatch(GetProducts(info));
  };
  return (
    <div className="purchase-orders">
      <div className="d-flex align-items-center justify-content-center mt-2">
        <div className="w-50 dropdown-card p-2">
          <div className="drop-down">
            <div className="d-flex justify-content-between">
              <h6>أختر نوع طلب الشراء</h6>
              <div className="dropdown-container">
                <Dropdown
                  value={selectedOption}
                  options={options}
                  onChange={handleSelect}
                  placeholder="Select an option"
                  // onSelect={GetSelectedSetHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <Column
              align="center"
              header={headers[3]}
              field="quantity"
            ></Column>
            <Column align="center" header={headers[4]} field="made"></Column>
            <Column
              align="center"
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
            //   totalRecords={totalItems}
            onPageChange={onBasicPageChange}
          ></Paginator>
        </div>
        <Toast ref={toast} />
      </div>
    </div>
  );
};

export default PurchasesDataTable;
