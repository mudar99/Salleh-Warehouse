import React from "react";
import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">إجمالي الإيرادات</h1>
        <li
          className="pi pi-ellipsis-v"
          style={{
            fontSize: ".9em",
            cursor: "pointer",
            color: "rgb(160, 160, 160)",
          }}
        ></li>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">مجموع مبيعات اليوم</p>
        <p className="amount">$499.99</p>
        <p className="desc">الإيرادات والدخل السابقين</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">الهدف</div>
            <div className="itemResult negative container">
              <li className="pi pi-angle-down"></li>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">الأسبوع الماضي</div>
            <div className="itemResult positive container">
              <li className="pi pi-angle-up"></li>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">الشهر الماضي</div>
            <div className="itemResult positive container">
              <li className="pi pi-angle-up"></li>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
