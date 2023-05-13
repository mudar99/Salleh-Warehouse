import React from "react";
import "./navbar.scss";
import { useDispatch } from "react-redux";
import { toggle } from "../../../redux/themeSlice";

import { InputText } from "primereact/inputtext";
import { opened } from "../../../redux/settingSlice";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <Link to="/profile">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </Link>
          </div>
          <div className="item" onClick={() => dispatch(opened())}>
            <i className="fas fa-cogs"></i>
          </div>
          <div className="item">
            <i className="far fa-bell"></i>
            <div className="counter">2</div>
          </div>
          <div className="item">
            <i className="far fa-paper-plane"></i>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <i className="pi pi-moon" onClick={() => dispatch(toggle())}></i>
          </div>
          <div className="item">
            <i className="pi pi-folder"></i>
          </div>
          <div className="item">
            <i className="pi pi-globe m-1"></i>
          </div>
        </div>

        {/* <div className="search">
          <input type="text" placeholder="البحث" />
          <i className="pi pi-search"></i>
        </div> */}

        <span className="search p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="بحث" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
