import { Button } from "primereact/button";
import React, { useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkVerificationCode,
  sendVerificationCode,
} from "../../../redux/API/settings/mailVerSlice";
import { showError, showSuccess } from "../../../ToastService";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

const MailVerifications = (props) => {
  const [code, setCode] = useState();
  const [correctCode, setCorrectCode] = useState();
  const dispatch = useDispatch();
  const toast = useRef();
  const { btnLoading, isDone } = useSelector((state) => state.mailVer);
  const mailConfirmation = (e) => {
    e.preventDefault();
    dispatch(sendVerificationCode()).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        setCorrectCode(res.payload.data.code);
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };
  const codeVerification = (e) => {
    e.preventDefault();
    let info = new FormData();
    info.append("code", code);
    info.append("correctCode", correctCode);
    dispatch(checkVerificationCode(info)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };
  return (
    <>
      <Toast ref={toast} />
      {!isDone && (
        <form onSubmit={mailConfirmation}>
          <div className="header">
            <h6>البريد الإلكتروني الخاص بك هو example@mail.com</h6>
            <h6>إذا كنت تريد تأكيد البريد الإلكتروني يمكنك إرسال رمز التحقق</h6>
          </div>

          <span className="actions mt-5">
            <Button
              loadingIcon="pi pi-spin pi-spinner"
              label="إرسال"
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
        <form onSubmit={codeVerification}>
          <div className="container mt-3">
            <h6 className="mt-2 text-right">أدخل رمز التحقق</h6>
            <InputText
              placeholder="Verification code"
              style={{ width: "100%" }}
              type="text"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>

          <span className="actions mt-5">
            <Button
              loadingIcon="pi pi-spin pi-spinner"
              label="التحقق"
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
    </>
  );
};

export default MailVerifications;
