import React, { useEffect, useRef, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import LoadingFS from "../components/loading/LoadingFS";
import "./purchase-orders.scss";
import { showError, showInfo, showSuccess } from "../../ToastService";
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
  const [selectedOption, setSelectedOption] = useState("waiting");
  const options = [
    { label: "المقبولة", value: "accepted" },
    { label: "المرفوضة", value: "rejected" },
    { label: "المعلّقة", value: "waiting" },
  ];
  const handleSelect = (e) => {
    setSelectedOption(e.value);
  };
  const dispatch = useDispatch();
  const { data, loading, totalItems } = useSelector((state) => state.purchases);
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

  const getPurchases = (info) => {
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
  };
  const acitonBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          disabled={selectedOption !== "waiting"}
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
                let info = { size: basicRows, page: currentPage };
                dispatch(AcceptPurshaseOrder(rowData.id)).then((res) => {
                  console.log(res);
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    getPurchases(info);
                    return;
                  }
                  showError(res.payload.message, toast);
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
          disabled={selectedOption !== "waiting"}
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
                let info = { size: basicRows, page: currentPage };
                dispatch(RejectPurchaseOrder(rowData.id)).then((res) => {
                  console.log(res);
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    setSelectedOption(selectedOption);
                    getPurchases(info);
                    return;
                  }
                  showError(res.payload.message, toast);
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
    getPurchases(info);
  };
  return (
    <div className="purchase-orders">
      {loading && <LoadingFS />}
      <div className="selection-container">
        <div className="selection">
          <h6>أختر نوع طلب الشراء</h6>
          <div className="">
            <Dropdown
              appendTo={"self"}
              value={selectedOption}
              options={options}
              onChange={handleSelect}
              placeholder="Select an option"
            />
          </div>
        </div>
      </div>
      <div className="datatable">
        {loading && <LoadingFS />}
        <div className="">
          <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
            <Column align="center" header={"المعرف"} field="id"></Column>
            <Column
              align="center"
              header="طريقة الدفع"
              body={(rowData) => {
                return rowData.payment_method === 0 ? "كاش" : "محفظة";
              }}
            ></Column>
            <Column align="center" header="المنتج" field="product_id"></Column>
            <Column align="center" header="الكمية" field="quantity"></Column>
            <Column
              align="center"
              field="created_at"
              header="تاريخ الإنشاء"
            ></Column>
            <Column
              align="center"
              header="حدث"
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
    </div>
  );
};

export default PurchasesDataTable;
