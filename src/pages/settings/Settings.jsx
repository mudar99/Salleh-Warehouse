import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { closed } from "../../redux/settingSlice";
import SendFiles from "./auth-files/SendFiles";
import { Dialog } from "primereact/dialog";
import MailVerifications from "./mail-verification/MailVerifications";

const Settings = () => {
  const dispatch = useDispatch();
  const [accoutVer, setAccoutVer] = useState(false);
  const [mailVer, setMailVer] = useState(false);
  const { status } = useSelector((state) => state.settings);

  return (
    <>
      <Sidebar
        showCloseIcon={false}
        position="left"
        appendTo={"self"}
        visible={status}
        onHide={() => dispatch(closed())}
        transitionOptions={{
          onEnter: () => document.querySelector(".p-sidebar-header").remove(),
        }}
      >
        <div className="header">
          <div>الإعدادات</div>
          <i className="fas fa-cog"></i>
        </div>
        <div className="title">يمكنك التحكم بإعدادات الحساب من هنا</div>
        <ul className="list">
          <li className="item">
            <h6>تغيير كلمة المرور</h6>
            <i className="fas fa-lock"></i>
          </li>
          <li
            className="item"
            onClick={() => {
              setAccoutVer(true);
            }}
          >
            <h6>توثيق الحساب</h6>
            <i className="fas fa-check"></i>
          </li>
          <li
            className="item"
            onClick={() => {
              setMailVer(true);
            }}
          >
            <h6>تأكيد البريد الإلكتروني</h6>
            <i className="fas fa-at"></i>
          </li>
          <li className="item">
            <h6>المحفظة</h6>
            <i className="fas fa-wallet"></i>
          </li>
          <li className="item">
            <h6>تعديل الملف الشخصي</h6>
            <i className="fas fa-user"></i>
          </li>
        </ul>
      </Sidebar>

      <Dialog
        header="إرسال مرفقات توثيق الحساب"
        visible={accoutVer}
        style={{ width: "50vw" }}
        onHide={() => setAccoutVer(false)}
        resizable
        appendTo={"self"}
      >
        <SendFiles visibleState={(e) => setAccoutVer(e)} />
      </Dialog>

      <Dialog
        header="تأكيد البريد الإلكتروني"
        visible={mailVer}
        style={{ width: "50vw" }}
        onHide={() => setMailVer(false)}
        resizable
        appendTo={"self"}
      >
        <MailVerifications visibleState={(e) => setMailVer(e)} />
      </Dialog>
    </>
  );
};

export default Settings;
