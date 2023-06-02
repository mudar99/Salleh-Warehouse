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
          <div className="item mb-2">
            <Link to="/profile">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </Link>
          </div>
          <div className="item" onClick={() => dispatch(opened())}>
          <i className="bi bi-gear-fill"></i>
          </div>
          <div className="item">
          <i className="bi bi-bell-fill"></i>
            <div className="counter">2</div>
          </div>
          <div className="item">
          <i className="bi bi-envelope-fill"></i>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <i className="bi bi-moon-fill" onClick={() => dispatch(toggle())}></i>
          </div>
          <div className="item">
          <i className="bi bi-folder-fill"></i>
          </div>
          <div className="item">
          <i className="bi bi-globe"></i>
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
