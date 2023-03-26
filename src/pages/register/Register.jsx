import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import React, { useState } from "react";
import NavBar from "../login/NavBar";
import "./register.scss";
const Register = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div className="register">
      <NavBar page={props.page} />
      <div className="registerContainer">
        <div className="logo">
          <img src="/Img/amara logo 3 png.png" alt="Car Maintenance" />
        </div>
        <div className="title">
          <h4>Salleh</h4>
          <h6>مستودعات بيع قطع السيارات</h6>
        </div>
        <form onSubmit={submitHandler}>
          <div className="fullName">
            <div className="fname card">
              <span className="p-float-label">
                <InputText
                  id="Fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  style={{ width: "100%" }}
                />
                <label for="Fname">
                  <p>الاسم الأول</p>
                </label>
              </span>
            </div>

            <div className="lname card">
              <span className="p-float-label">
                <InputText
                  id="Lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  style={{ width: "100%" }}
                />
                <label for="Fname">
                  <p>الاسم الثاني</p>
                </label>
              </span>
            </div>
          </div>
          <div className="card">
            <span className="p-float-label">
              <InputText
                id="warehouse"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                style={{ width: "100%" }}
              />
              <label for="warehouse">
                <i className="fas fa-warehouse"></i>
                <p>اسم المستودع</p>
              </label>
            </span>
          </div>

          <div className="card">
            <span className="p-float-label">
              <InputText
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ width: "100%" }}
              />
              <label for="phoneNumber">
                <i class="fas fa-mobile-alt"></i>
                <p>رقم الهاتف</p>
              </label>
            </span>
          </div>

          <div className="card">
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

          <div className="card">
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

          <div className="card">
            <span className="p-float-label">
              <InputText
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                style={{ width: "100%" }}
              />
              <label for="passwordConfirm">
                <i class="fas fa-user-lock	"></i>
                <p>تأكيد كلمة المرور</p>
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

export default Register;