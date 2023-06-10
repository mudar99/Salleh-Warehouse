import React, { useRef, useState } from "react";
import { FilePond, File, registerPlugin } from "react-filepond";
import "./sendfiles.scss";
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { sendAuthFiles } from "../../../redux/API/settings/sendfilesSlice";
import { showError, showSuccess } from "../../../ToastService";
import { Toast } from "primereact/toast";
import MapTest from "../maps/MapTest";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const SendFiles = (props) => {
  const toast = useRef(null);
  const { btnLoading } = useSelector((state) => state.authFiles);
  const dispatch = useDispatch();
  const [ids, setIds] = useState([]);
  const [stores, setStores] = useState([]);
  const [newPosition, setNewPosition] = useState();
  const assignIds = (fileItems) => {
    setIds(fileItems.map((fileItem) => fileItem.file));
  };
  const assignStores = (fileItems) => {
    setStores(fileItems.map((fileItem) => fileItem.file));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let info = new FormData();
    ids.forEach((id, index) => {
      info.append(`IDphoto[${index}]`, id);
    });
    stores.forEach((store, index) => {
      info.append(`storehouse_photo[${index}]`, store);
    });
    info.append("latitude", newPosition.lat);
    info.append("longitude", newPosition.lng);
    dispatch(sendAuthFiles(info)).then((res) => {
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
  return (
    <>
      <form className="sendFiles" onSubmit={submitHandler}>
        <div className="header">قم بإرفاق صور للبطاقة الشخصية</div>
        <FilePond
          // oninit={() => document.querySelector(".filepond--credits").remove()}
          files={ids}
          allowMultiple={true}
          allowReorder={true}
          onreorderfiles={assignIds}
          name="ids"
          allowFileTypeValidation={true}
          acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
          labelIdle={`<div><p>إسحب و أفلت ملفاتك أو تصفح</p></div>`}
          onupdatefiles={assignIds}
        />

        <div className="header">قم بإرفاق صور للمستودع</div>
        <FilePond
          // oninit={() => document.querySelector(".filepond--credits").remove()}
          files={stores}
          allowMultiple={true}
          allowReorder={true}
          onreorderfiles={assignStores}
          name="stores"
          allowFileTypeValidation={true}
          acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
          labelIdle={`<div><p>إسحب و أفلت ملفاتك أو تصفح</p></div>`}
          onupdatefiles={assignStores}
        />

        <MapTest setLatLng={(e) => setNewPosition(e)} />
        <span className="actions">
          <Button
            loadingIcon="pi pi-spin pi-spinner"
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
      <Toast ref={toast} />
    </>
  );
};

export default SendFiles;
