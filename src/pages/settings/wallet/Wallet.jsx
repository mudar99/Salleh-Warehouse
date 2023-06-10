import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateWallet,
  GetMyBalance,
  GetWalletStatus,
} from "../../../redux/API/settings/walletSlice";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../../ToastService";
import "./wallet.scss";
const Wallet = (props) => {
  const { walletStatus, walletBalance, btnLoading } = useSelector(
    (state) => state.wallet
  );
  const dispatch = useDispatch();
  const toast = useRef();
  console.log(walletStatus)
  useEffect(() => {
    dispatch(GetWalletStatus());
    walletStatus && dispatch(GetMyBalance());
  }, [btnLoading]);

  const handleCreateWallet = () => {
    dispatch(CreateWallet()).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };
  return walletStatus !== null ? (
    <div className="wallet-container">
      {walletStatus ? (
        <div className="wallet">
          <h6 className="title alert" role="alert">
            رصيدك الحالي هو
            <strong> {walletBalance} ل.س</strong>
          </h6>
          <div className="mt-5 actions">
            <Button
              dir="ltr"
              label="إضافة رصيد"
              icon="pi pi-dollar"
              type="submit"
              raised
            />
            <Button
              dir="ltr"
              severity="danger"
              label="إلغاء"
              icon="pi pi-times"
              type="submit"
              raised
              onClick={() => props.visibleState(false)}
            />
          </div>
        </div>
      ) : (
        <div className="wallet create-wallet-container">
          <div className="title alert " role="alert">
            <strong>لاتمتلك محفظة</strong> هل تود إنشائها الآن؟
          </div>
          <div className="action mt-5 text-center">
            <Button
              dir="ltr"
              label="إنشاء"
              icon="pi pi-check"
              type="submit"
              raised
              loadingIcon="pi pi-spin pi-spinner"
              loading={btnLoading}
              onClick={handleCreateWallet}
            />
          </div>
        </div>
      )}
      <Toast ref={toast} />
    </div>
  ) : (
    <div className="text-center">
      <div className="spinner-border" role="status"></div>
    </div>
  );
};

export default Wallet;
