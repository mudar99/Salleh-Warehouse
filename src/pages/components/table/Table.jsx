import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./table.scss";
const Table = () => {
  const data = [
    {
      id: 1143155,
      payment: "كاش",
      img: "/Img/Hyundai.png",
      customer: "مضر أبو فخر",
      date: "1 March",
      amount: 120000,
      workshop: "ورشة الفحامة",
      status: "كهربائي",
    },
    {
      id: 2235235,
      payment: "أونلاين",
      img: "/Img/Hyundai.png",
      customer: "عبد الله",
      date: "1 March",
      amount: 40000,
      workshop: "ورشة عالم الصيانة",
      status: "ميكانيكي",
    },
    {
      id: 2342353,
      payment: "سيرياتيل كاش",
      img: "/Img/Peugeot.png",
      customer: "عبير جريرة",
      date: "1 March",
      amount: 10000,
      workshop: "ورشة عالم الصيانة",
      status: "كهربائي",
    },
    {
      id: 2357741,
      payment: "كاش",
      img: "/Img/Nissan.png",
      customer: "علي خضر",
      date: "1 March",
      amount: 25000,
      workshop: "ورشة سلام",
      status: "ميكانيكي",
    },
    {
      id: 2342355,
      payment: "كاش",
      img: "/Img/Nissan.png",
      customer: "حازم سلامي",
      date: "1 March",
      amount: 35000,
      workshop: "ورشة عالم الصيانة",
      status: "كهربائي",
    },
  ];

  const imageBodyTemplate = (rowData) => {
    return (
      <img src={rowData.img} alt={rowData.img} className="product-image" />
    );
  };
  return (
    <div>
      <div className="table card">
        <DataTable value={data} responsiveLayout="scroll">
          <Column align="center" field="id" header="المعرف"></Column>
          <Column align="center" field="customer" header="الزبون"></Column>
          <Column
            align="center"
            body={imageBodyTemplate}
            field="img"
            header="نوع السيارة"
          ></Column>
          <Column align="center" field="payment" header="الدفع"></Column>
          <Column align="center" field="date" header="التاريخ"></Column>
          <Column align="center" field="amount" header="الكلفة"></Column>
          <Column align="center" field="workshop" header="الورشة"></Column>
          <Column align="center" field="status" header="نوع العطل"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Table;
