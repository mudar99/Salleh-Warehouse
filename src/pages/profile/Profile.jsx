import React, { useState } from "react";
import List from "../list/List";
import "./profile.scss";
import { Sidebar } from "primereact/sidebar";
import Settings from "../settings/Settings";

const Profile = () => {
  return (
    <div className="profile">
      <List component="ProfileContent" />
      {/* <div className="card flex justify-content-center">
        <Sidebar
          position="left"
          appendTo={"self"}
          visible={visibleSide}
          onHide={() => setVisibleSide(false)}
          transitionOptions={{
            onEnter: () => console.log("onEnter"),
            onEntered: () => console.log("onEntered"),
          }}
        >
          <h2 className="header">الإعدادات</h2>
          <ul className="list">
            <li className="item">
              <h6>تغيير كلمة المرور</h6>
              <i className="fas fa-lock"></i>
            </li>
            <li className="item">توثيق الحساب</li>
            <li className="item">تأكيد البريد الإلكتروني</li>
            <li className="item">المحفظة</li>
            <li className="item">تعديل الملف الشخصي</li>
          </ul>
        </Sidebar>
      </div> */}
    </div>
  );
};

export default Profile;
