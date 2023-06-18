import React, { useEffect, useRef, useState } from "react";
import "./complaints.scss";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { GetSuggestions } from "../../redux/API/complaints & suggestions/suggestionsSlice";
import { GetComplaints } from "../../redux/API/complaints & suggestions/complaintsSlice";
import LoadingFS from "../components/loading/LoadingFS";
import { isArabic } from "../../utils/langType";

const ComplaintsDataTable = (props) => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(3);
  const { data, loading, btnLoading, totalItems } = useSelector(
    (state) => state.complaints
  );
  useEffect(() => {
    let info = { size: basicRows, page: currentPage };
    dispatch(GetComplaints(info));
  }, []);

  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { size: basicRows, page: currentPage };
    dispatch(GetComplaints(info));
  };
  return (
    <>
      {loading && <LoadingFS />}
      <div className="complaints-datatable">
        <div className="complaints">
          {data.map((complaint) => (
            <div key={complaint.id} className="complaint text-break">
              <div
                className={`title ${
                  isArabic(complaint.title) ? "arabic" : "english"
                }`}
              >
                {complaint.title}
              </div>
              <div
                className={`description ${
                  isArabic(complaint.description) ? "arabic" : "english"
                }`}
              >
                {complaint.description}
              </div>
            </div>
          ))}
        </div>

        <div className="action">
          <div
            className="add-complaint"
            onClick={() => props.addComplaint(true, basicRows)}
          >
            <i className="bi bi-plus plus-icon"></i>
          </div>
        </div>
        <Paginator
          first={basicFirst}
          rows={basicRows}
          totalRecords={totalItems}
          onPageChange={onBasicPageChange}
        ></Paginator>
      </div>
    </>
  );
};

export default ComplaintsDataTable;
