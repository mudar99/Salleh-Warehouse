import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { CreateProduct, GetProducts } from "../../redux/API/productSlice";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import { FileUpload } from "primereact/fileupload";

export const AddProduct = (props) => {
  const [prodName, setProdName] = useState();
  const [prodDescription, setProdDescription] = useState();
  const [prodMade, setProdMade] = useState();
  const [prodPrice, setProdPrice] = useState();
  const [prodCode, setProdCode] = useState();
  const [prodPhoto, setProdPhoto] = useState();
  const [prodQuantity, setProdQuantity] = useState();

  const dispatch = useDispatch();
  const { btnLoading } = useSelector((state) => state.products);
  const AddProductHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("name", prodName);
    obj.append("description", prodDescription);
    obj.append("made", prodMade);
    obj.append("price", prodPrice);
    obj.append("product_code", prodCode);
    obj.append("quantity", prodQuantity);
    obj.append("product_photo", prodPhoto);
    let data = { id: props.data.key, obj };
    console.log(prodQuantity)
    // dispatch(CreateProduct(data)).then((res) => {
    //   console.log(res);
    //   if (res.payload.status === true) {
    //     showSuccess(res.payload.message, toast);
    //     setTimeout(() => {
    //       props.visibleState(false);
    //       dispatch(GetProducts());
    //     }, 1000);
    //     return;
    //   }
    //   showError(res.payload, toast);
    // });
  };
  const toast = useRef(null);
  return (
    <form className="container" onSubmit={AddProductHandler}>
      <Toast ref={toast} />
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم المنتج</h6>
          <InputText
            placeholder="Product name"
            style={{ width: "100%" }}
            onChange={(e) => {
              setProdName(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">وصف المنتج</h6>
          <InputText
            placeholder="Description"
            style={{ width: "100%" }}
            onChange={(e) => {
              setProdDescription(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">الشركة المصنعة للمنتج</h6>
          <InputText
            placeholder="Manufacture"
            style={{ width: "100%" }}
            type="text"
            onChange={(e) => {
              setProdMade(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">سعر المنتج</h6>
          <InputText
            placeholder="Prodcut price"
            style={{ width: "100%" }}
            type="text"
            onChange={(e) => {
              setProdPrice(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">كود المنتج</h6>
          <InputText
            placeholder="Product code"
            style={{ width: "100%" }}
            type="text"
            onChange={(e) => {
              setProdCode(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">الكمية</h6>
          <InputText
            placeholder="Quantity"
            style={{ width: "100%" }}
            type="text"
            onChange={(e) => {
              setProdQuantity(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3 d-flex justify-content-between mt-4 mb-3 ">
          <h6 className="mt-2 text-right">صورة المنتج</h6>
          <FileUpload
            mode="basic"
            name="demo[]"
            accept="image/*"
            maxFileSize={1000000}
            onSelect={(event) => setProdPhoto(event.files[0])}
          />
        </div>
      </div>
      <span className="actions">
        <Button
          label="إضافة"
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
