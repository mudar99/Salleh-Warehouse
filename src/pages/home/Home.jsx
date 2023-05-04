import React, { useEffect } from "react";
import Chart from "../components/chart/Chart";
import Featured from "../components/featured/Featured";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Widget from "../components/widget/Widget";
import Table from "../components/table/Table";
import "./home.scss";
import Cookies from "universal-cookie";

const Home = () => {
  const cookie = new Cookies();

  useEffect(() => {
    if (cookie.get("jwt_store") === undefined) {
      window.location.href = "/login";
    }
  }, []);
  if (cookie.get("jwt_store") === undefined) {
    window.location.href = "/login";
  } else
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="مخطط الربح" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">الأعمال</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
