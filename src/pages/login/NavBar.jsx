import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggle } from "../../redux/themeSlice";
import "./navBar.scss";
const NavBar = (props) => {
  const dispatch = useDispatch();
  console.log(props.page);
  return (
    <nav className="navBar">
      <div class="logo">
        <img src="/Img/Salleh.png" alt="Salleh" />
      </div>
      <ul className="list">
        <li className="item" onClick={() => dispatch(toggle())}>
          Theme
        </li>
        <Link to={props.page === "login" ? "/register" : "/login"}>
          <li className="item">
            {props.page === "login" ? "Register" : "Login"}
          </li>
        </Link>
        <li className="item">Salleh</li>
      </ul>
    </nav>
  );
};

export default NavBar;
