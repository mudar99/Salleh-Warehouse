import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import NavBar from "./NavBar";
import Cookies from "universal-cookie";
import { showError, showSuccess } from "../../ToastService";
import { userLogin } from "../../redux/API/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { fetchToken } from "../../firebase";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcmRoken, setFcmToken] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const toast = useRef(null);
  const cookie = new Cookies();

  const submitHandler = (e) => {
    e.preventDefault();

    let user = new FormData();
    user.append("email", email);
    user.append("password", password);
    user.append("fcm_token", fcmRoken);

    dispatch(userLogin(user)).then((res) => {
      console.log(res);
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
  const handleFcmToken = (token) => {
    // Handle the FCM token
    console.log("FCM Token:", token);
    // Perform additional actions with the token if needed
  };

  useEffect(() => {
    if (cookie.get("jwt_store") !== undefined) {
      window.location.href = "/";
    }
    // Call the fetchToken function with the handleFcmToken function
    fetchToken(handleFcmToken)
      .then((token) => {
        // Token retrieval success
        console.log("Token Retrieved:", token);
        setFcmToken(token);
      })
      .catch((error) => {
        // Token retrieval error
        console.error("Error Retrieving Token:", error);
      });
  }, []);
  return (
    <div className="login">
      <Toast ref={toast} dir="ltr" />
      <NavBar page={props.page} />
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
                required
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
              />
              <label htmlFor="email">
                <i className="bi bi-envelope-at-fill"></i>
                <p>البريد الالكتروني</p>
              </label>
            </span>
          </div>

          <div className="card flex justify-content-center">
            <span className="p-float-label">
              <InputText
                required
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }}
              />
              <label htmlFor="password">
                <i className="bi bi-person-fill-lock"></i>
                <p>كلمة المرور</p>
              </label>
            </span>
          </div>
          <div className="submit">
            <Button
              label="تسجيل الدخول"
              raised
              loadingIcon="pi pi-spin pi-spinner"
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

export default Login;
