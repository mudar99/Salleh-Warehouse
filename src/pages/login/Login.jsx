import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import React, { useState } from "react";
import "./login.scss";
import NavBar from "./NavBar";
const Login = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <NavBar page={props.page}/>
      <div className="loginContainer">
        <div className="logo">
          <img src="/Img/amara logo 3 png.png" alt="Car Maintenance" />
        </div>
        <div className="title">
          <h4>Salleh</h4>
          <h6>مستودعات بيع قطع السيارات</h6>
        </div>
        <form onSubmit={submitHandler}>
          <div className="card flex justify-content-center">
            <span className="p-float-label">
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
              />
              <label for="email">
                <i class="fa fa-envelope"></i>
                <p>البريد الالكتروني</p>
              </label>
            </span>
          </div>

          <div className="card flex justify-content-center">
            <span className="p-float-label">
              <InputText
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }}
              />
              <label for="password">
                <i class="fas fa-user-lock	"></i>
                <p>كلمة المرور</p>
              </label>
            </span>
          </div>
          <div className="submit">
            <Button label="تسجيل الدخول" raised loading={false} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
