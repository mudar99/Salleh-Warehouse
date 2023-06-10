import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import React, { useEffect, useRef, useState } from "react";
import NavBar from "../login/NavBar";
import "./register.scss";
import { userRegister } from "../../redux/API/authSlice";
import { showError, showSuccess } from "../../ToastService";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";

const Register = (props) => {
  const toast = useRef(null);
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    if (cookie.get("jwt_store") !== undefined) {
      window.location.href = "/";
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let user = new FormData();
    user.append("store_name", warehouse);
    user.append("firstname", fname);
    user.append("lastname", lname);
    user.append("email", email);
    user.append("phone_number", phoneNumber);
    user.append("password", password);
    if (password !== passwordConfirm) {
      showError("Password doesn't match", toast);
      return;
    }
    dispatch(userRegister(user)).then((res) => {
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      if (typeof res.payload === "object") {
        showError(res.payload.message, toast);
      } else if (typeof res.payload === "string") {
        showError(res.payload, toast);
      }
    });
  };

  return (
    <div className="register">
      <Toast ref={toast} dir="ltr" />
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
                  required
                  id="Fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  style={{ width: "100%" }}
                />
                <label htmlFor="Fname">
                  <p>الاسم الأول</p>
                </label>
              </span>
            </div>

            <div className="lname card">
              <span className="p-float-label">
                <InputText
                  required
                  id="Lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  style={{ width: "100%" }}
                />
                <label htmlFor="Fname">
                  <p>الاسم الثاني</p>
                </label>
              </span>
            </div>
          </div>
          <div className="card">
            <span className="p-float-label">
              <InputText
                required
                id="warehouse"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                style={{ width: "100%" }}
              />
              <label htmlFor="warehouse">
                <i className="bi bi-building-fill"></i>
                <p>اسم المستودع</p>
              </label>
            </span>
          </div>

          <div className="card">
            <span className="p-float-label">
              <InputText
                required
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ width: "100%" }}
              />
              <label htmlFor="phoneNumber">
                <i className="bi bi-phone-fill"></i>
                <p>رقم الهاتف</p>
              </label>
            </span>
          </div>

          <div className="card">
            <span className="p-float-label">
              <InputText
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
                type="email"
              />
              <label htmlFor="email">
                <i className="bi bi-envelope-at-fill"></i>
                <p>البريد الالكتروني</p>
              </label>
            </span>
          </div>

          <div className="card">
            <span className="p-float-label">
              <InputText
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }}
                type="password"
              />
              <label htmlFor="password">
                <i className="bi bi-person-fill-lock"></i>
                <p>كلمة المرور</p>
              </label>
            </span>
          </div>

          <div className="card">
            <span className="p-float-label">
              <InputText
                required
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                style={{ width: "100%" }}
                type="password"
              />
              <label htmlFor="passwordConfirm">
                <i className="bi bi-person-fill-lock"></i>
                <p>تأكيد كلمة المرور</p>
              </label>
            </span>
          </div>
          <div className="submit">
            <Button
              loadingIcon="pi pi-spin pi-spinner"
              label="تسجيل الدخول"
              raised
              loading={loading}
              type="submit"
              dir="ltr"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
