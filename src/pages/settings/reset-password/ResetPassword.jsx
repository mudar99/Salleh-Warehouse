import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import { showError, showSuccess } from "../../../ToastService";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import {
  SaveResetPassword,
  SendResetPasswordCode,
} from "../../../redux/API/settings/passResetSlice";
import LanguageInput from "../../../utils/LanguageInput";

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const toast = useRef();
  const { btnLoading, isDone } = useSelector((state) => state.resetPassword);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [correctCode, setCorrectCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendResetCode = (e) => {
    e.preventDefault();
    let info = new FormData();
    info.append("email", email);
    dispatch(SendResetPasswordCode(info)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        setCorrectCode(res.payload.data.code);
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };
  const resetPassword = (e) => {
    e.preventDefault();
    let info = new FormData();
    info.append("code", code);
    info.append("correctCode", correctCode);
    info.append("newPassword", newPassword);
    info.append("confirmPassword", confirmPassword);
    info.append("email", email);
    dispatch(SaveResetPassword(info)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setTimeout(() => {
          props.visibleState(false);
        }, 1000);
        return;
      }
      showError(res.payload, toast);
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      {!isDone && (
        <form onSubmit={sendResetCode}>
          <div className="container mt-3">
            <h6 className="mt-2 text-right">أدخل البريد الإلكتروني</h6>
            <InputText
              placeholder="name@example.com"
              style={{ width: "100%" }}
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <span className="actions mt-3">
            <Button
              loadingIcon="pi pi-spin pi-spinner"
              label="إرسال الرمز"
              icon="pi pi-check"
              type="submit"
              raised
              loading={btnLoading}
            />
            <Button
              label="إلغاء"
              icon="pi pi-times"
              severity="danger"
              type="button"
              raised
              onClick={() => props.visibleState(false)}
            />
          </span>
        </form>
      )}
      {isDone && (
        <form onSubmit={resetPassword}>
          <div className="container mt-3">
            <h6 className="mt-2 text-right">أدخل رمز التحقق</h6>
            <LanguageInput
              placeholder="Reset password code"
              type="text"
              required
              onChange={(e) => {
                setCode(e);
              }}
            />
          </div>
          <div className="container mt-3">
            <h6 className="mt-2 text-right">كلمة المرور الجديدة</h6>
            <LanguageInput
              placeholder="New password"
              type="password"
              required
              onChange={(e) => {
                setNewPassword(e);
              }}
            />
          </div>
          <div className="container mt-3">
            <h6 className="mt-2 text-right">تأكيد كلمة المرور</h6>
            <LanguageInput
              placeholder="Confirm password"
              type="password"
              required
              onChange={(e) => {
                setConfirmPassword(e);
              }}
            />
          </div>
          <span className="actions mt-3">
            <Button
              loadingIcon="pi pi-spin pi-spinner"
              label="حفظ"
              icon="pi pi-check"
              type="submit"
              raised
              loading={btnLoading}
            />
            <Button
              label="إلغاء"
              icon="pi pi-times"
              severity="danger"
              type="button"
              raised
              onClick={() => props.visibleState(false)}
            />
          </span>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
