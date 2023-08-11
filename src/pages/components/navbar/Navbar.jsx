import React from "react";
import "./navbar.scss";
import { useDispatch } from "react-redux";
import { toggle } from "../../../redux/themeSlice";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { opened } from "../../../redux/settingSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const profileTt = React.useRef(null);
  const settingTt = React.useRef(null);
  const notificationTt = React.useRef(null);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div ref={profileTt} className="item mb-2">
            <Link to="/profile">
              <img src="/Img/man.png" alt="" className="avatar" />
            </Link>
            <Tooltip
              showDelay={1000}
              target={profileTt}
              content="الملف الشخصي"
              position="bottom"
            />
          </div>
          <div
            ref={settingTt}
            className="item"
            onClick={() => dispatch(opened())}
          >
            <i className="bi bi-gear-fill"></i>
            <Tooltip
              showDelay={1000}
              target={settingTt}
              content="الإعدادات"
              position="bottom"
            />
          </div>
          <div ref={notificationTt} className="item">
            <i className="bi bi-bell-fill"></i>
            <div className="counter">2</div>
            <Tooltip
              showDelay={1000}
              target={notificationTt}
              content="الإشعارات"
              position="bottom"
            />
          </div>
          <div className="item">
            <i
              className="bi bi-moon-fill"
              onClick={() => dispatch(toggle())}
            ></i>
          </div>
        </div>

        <span className="search p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="بحث" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
