import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import {
  AddSuggestion,
  GetSuggestions,
} from "../../redux/API/complaints & suggestions/suggestionsSlice";
import { showError, showSuccess } from "../../ToastService";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import LanguageInput from "../../utils/LanguageInput";

const AddSuggest = (props) => {
  const toast = useRef(null);
  const { btnLoading, currentPage } = useSelector((state) => state.suggestions);
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const AddSuggestHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("title", title);
    obj.append("description", description);
    let info = { size: props.basicRows, page: currentPage };
    dispatch(AddSuggestion(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setTimeout(() => {
          props.visibleState(false);
          dispatch(GetSuggestions(info));
        }, 1000);
        return;
      }
      showError(res.payload, toast);
    });
  };

  return (
    <div>
      <form className="container" onSubmit={AddSuggestHandler}>
        <Toast ref={toast} />
        <div className="form-group wrapper">
          <div className="container mt-3">
            <h6 className="mt-2 text-right">عنوان الاقتراح</h6>
            <LanguageInput
              required
              placeholder="Suggest title"
              type="text"
              onChange={(e) => {
                setTitle(e);
              }}
            />
          </div>
          <div className="container mt-3">
            <h6 className="mt-2 text-right">وصف الاقتراح</h6>
            <LanguageInput
              required
              placeholder="Suggest description"
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

export default AddSuggest;
