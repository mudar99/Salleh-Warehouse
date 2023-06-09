import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import { FileUpload } from "primereact/fileupload";
import { UpdateProduct as updateApi } from "../../redux/API/productSlice";
import LanguageInput from "../../utils/LanguageInput";

export const UpdateProduct = (props) => {
  console.log(props.data);
  const [prodName, setProdName] = useState(props.data.name);
  const [prodDescription, setProdDescription] = useState(
    props.data.description
  );
  const [prodMade, setProdMade] = useState(props.data.made);
  const [prodPrice, setProdPrice] = useState(props.data.price);
  const [prodCode, setProdCode] = useState(props.data.product_code);
  const [prodPhoto, setProdPhoto] = useState();
  const [prodQuantity, setProdQuantity] = useState(props.data.quantity);

  const dispatch = useDispatch();
  const { btnLoading } = useSelector((state) => state.products);
  const UpdateProductHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("name", prodName);
    obj.append("description", prodDescription);
    obj.append("made", prodMade);
    obj.append("price", prodPrice);
    obj.append("product_code", prodCode);
    obj.append("quantity", prodQuantity);
    if (prodPhoto !== undefined) obj.append("product_photo", prodPhoto);
    let data = { id: props.data.id, obj };
    console.log(prodQuantity);
    dispatch(updateApi(data)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setTimeout(() => {
          props.visibleState(false);
          // dispatch(GetProducts());
        }, 1000);
        return;
      }
      showError(res.payload, toast);
    });
  };
  const toast = useRef(null);
  return (
    <form className="container" onSubmit={UpdateProductHandler}>
      <Toast ref={toast} />
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم المنتج</h6>
          <LanguageInput
            defaultValue={props.data.name}
            placeholder="Product name"
            type="text"
            onChange={(e) => {
              setProdName(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">وصف المنتج</h6>
          <LanguageInput
            defaultValue={props.data.description}
            placeholder="Description"
            type="text"
            onChange={(e) => {
              setProdDescription(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">الشركة المصنعة للمنتج</h6>
          <LanguageInput
            defaultValue={props.data.made}
            placeholder="Manufacture"
            type="text"
            onChange={(e) => {
              setProdMade(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">سعر المنتج</h6>
          <LanguageInput
            defaultValue={props.data.price}
            placeholder="Prodcut price"
            type="number"
            onChange={(e) => {
              setProdPrice(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">كود المنتج</h6>
          <LanguageInput
            defaultValue={props.data.product_code}
            placeholder="Product code"
            type="text"
            onChange={(e) => {
              setProdCode(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">الكمية</h6>
          <LanguageInput
            defaultValue={props.data.quantity}
            placeholder="Quantity"
            type="number"
            onChange={(e) => {
              setProdQuantity(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">صورة المنتج</h6>
          <FileUpload
            mode="advanced"
            chooseLabel="اختر صورة"
            cancelLabel="إلغاء"
            accept="image/*"
            maxFileSize={1000000}
            onSelect={(event) => setProdPhoto(event.files[0])}
          />
        </div>
      </div>
      <span className="actions">
        <Button
          loadingIcon="pi pi-spin pi-spinner"
          label="تعديل"
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
  );
};
