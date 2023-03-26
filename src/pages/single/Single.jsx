import React from "react";
import "./single.scss";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Chart from "../components/chart/Chart";
import List from "../components/table/Table";
import { Button } from "primereact/button";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-text p-button-success"
                aria-label="Submit"
              />
            </div>
            <h1 className="title">معلومات المستخدم</h1>
            <div className="item">
              <img src="/Img/man.png" alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">مضر أبو فخر</h1>
                <div className="detailItem">
                  <span className="itemKey">البريد الالكتروني: </span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">رقم الجوال: </span>
                  <span className="itemValue">0935150221</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">العنوان: </span>
                  <span className="itemValue">دمشق، المزة</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">نوع السيارة: </span>
                  <span className="itemValue">هوندا</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="إنفاق المستخدم" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
