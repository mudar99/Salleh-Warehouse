import React from "react";
import "./widget.scss";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "المستخدمون",
        isMoney: false,
        icon: (
          <i
            className="pi pi-user"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          ></i>
        ),
      };
      break;
    case "order":
      data = {
        title: "الطلبات",
        isMoney: false,
        icon: (
          <i
            className="pi pi-briefcase"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          ></i>
        ),
      };
      break;
    case "earning":
      data = {
        title: "الأرباح",
        isMoney: true,
        icon: (
          <i
            className="pi pi-chart-line"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          ></i>
        ),
      };
      break;
    case "balance":
      data = {
        title: "الميزانية",
        isMoney: true,
        icon: (
          <i
            className="pi pi-dollar"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          ></i>
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">عرض التفاصيل</span>
      </div>
      <div className="right">
        <div className="percentage positive">% {diff}</div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
