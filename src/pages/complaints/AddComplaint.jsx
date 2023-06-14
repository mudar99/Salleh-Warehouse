import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import {
  AddComplaintService,
  GetComplaints,
} from "../../redux/API/complaints & suggestions/complaintsSlice";
import { showError, showSuccess } from "../../ToastService";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import LanguageInput from "../../utils/LanguageInput";

const AddComplaint = (props) => {
  const toast = useRef(null);
  const { btnLoading, currentPage } = useSelector((state) => state.complaints);
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const AddComplaintHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("title", title);
    obj.append("description", description);
    let info = { size: props.basicRows, page: currentPage };
    dispatch(AddComplaintService(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setTimeout(() => {
          props.visibleState(false);
          dispatch(GetComplaints(info));
        }, 1000);
        return;
      }
      showError(res.payload, toast);
    });
  };

  return (
    <div>
      <form className="container" onSubmit={AddComplaintHandler}>
        <Toast ref={toast} />
        <div className="form-group wrapper">
          <div className="container mt-3">
            <h6 className="mt-2 text-right">عنوان الشكوى</h6>
            <LanguageInput
              required
              placeholder="Complaint title"
              type="text"
              onChange={(e) => {
                setTitle(e);
              }}
            />
          </div>
          <div className="container mt-3">
            <h6 className="mt-2 text-right">وصف الشكوى</h6>
            <LanguageInput
              required
              placeholder="Complaint description"
              type="text"
              onChange={(e) => {
                setDescription(e);
              }}
            />
          </div>
        </div>
        <span className="actions">
          <Button
            label="إضافة"
            icon="pi pi-check"
            type="submit"
            raised
            loadingIcon="pi pi-spin pi-spinner"
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
    </div>
  );
};

export default AddComplaint;
