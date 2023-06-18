import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dark, light } from "../../../redux/themeSlice";
import {
  products,
  dashboard,
  categories,
  profile,
  purchases,
  suggestions,
  complaints,
} from "../../../redux/visitSlice";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import Cookies from "universal-cookie";
import { userLogout } from "../../../redux/API/authSlice";
import { opened } from "../../../redux/settingSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { place } = useSelector((state) => state.VisitStatus);
  console.log(place);
  localStorage.setItem("place", place);
  const currentPlace = localStorage.getItem("place");
  const cookie = new Cookies();

  const logoutConfirmation = (event) => {
    confirmPopup({
      appendTo: document.querySelector("#log-out"),
      target: event.currentTarget,
      message: "هل تود تسجيل الخروج؟",
      icon: "pi pi-info-circle",
      acceptLabel: "نعم",
      rejectLabel: "لا",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-text",
      accept: () => {
        dispatch(userLogout(cookie.get("jwt_store")));
      },
    });
  };

  return (
    <div className="sidebar">
      <div className="top ">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="logo" src="/Img/amara logo 3 png.png" alt="Salleh" />
        </Link>
      </div>

      <hr />

      <div className="center">
        <ul>
          <div
            className="header"
            data-bs-toggle="collapse"
            href="#mainServices"
          >
            <p className="title">رئيسي</p>
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="mainServices">
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(dashboard())}
            >
              <li className={currentPlace === "dashboard" ? "visited" : ""}>
                <i className="bi bi-pie-chart-fill"></i>
                <span>لوحة التحكم</span>
              </li>
            </Link>
            <Link
              to="/products"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(products())}
            >
              <li className={currentPlace === "products" ? "visited" : ""}>
                <i className="bi bi-bag-heart-fill"></i>
                <span>منتجات</span>
              </li>
            </Link>
            <Link
              to="/categories"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(categories())}
            >
              <li className={currentPlace === "categories" ? "visited" : ""}>
                <i className="bi bi-house-fill"></i>
                <span>أصناف</span>
              </li>
            </Link>
            <Link
              to="/purchases"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(purchases())}
            >
              <li className={currentPlace === "purchases" ? "visited" : ""}>
                <i className="bi bi-bag-fill"></i>
                <span>طلبات الشراء</span>
              </li>
            </Link>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#usage">
            <p className="title">استخدام</p>
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="usage">
            <li>
              <i className="bi bi-bell-fill"></i>
              <span>إشعارات</span>
            </li>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#services">
            <p className="title">خدمات</p>
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="services">
            <Link
              to="/complaints"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(complaints())}
            >
              <li className={currentPlace === "complaints" ? "visited" : ""}>
                <i className="bi bi-exclamation-circle-fill"></i>
                <span>شكاوى</span>
              </li>
            </Link>
            <Link
              to="/suggestions"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(suggestions())}
            >
              <li className={currentPlace === "suggestions" ? "visited" : ""}>
                <i className="bi bi-patch-check-fill"></i>
                <span>اقتراحات</span>
              </li>
            </Link>
            <li>
              <i className="bi bi-clock-history"></i>
              <span>سجلات النظام</span>
            </li>
            <li onClick={() => dispatch(opened())}>
              <i className="bi bi-gear-fill"></i>
              <span>إعدادات</span>
            </li>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#user">
            <p className="title">مستخدم</p>
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="user">
            <Link
              to="/profile"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(profile())}
            >
              <li>
                <i className="bi bi-person-fill"></i>
                <span>ملف شخصي</span>
              </li>
            </Link>
            <li onClick={logoutConfirmation}>
              <i className="bi bi-box-arrow-right"></i>
              <span id="log-out">تسجيل خروج</span>
            </li>
          </div>
        </ul>
      </div>

      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch(light())}></div>
        <div className="colorOption" onClick={() => dispatch(dark())}></div>
      </div>
      <ConfirmPopup />
    </div>
  );
};

export default Sidebar;
