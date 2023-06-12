import React, { useEffect, useRef, useState } from "react";
import "./suggestions.scss";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { GetSuggestions } from "../../redux/API/complaints & suggestions/suggestionsSlice";
import LoadingFS from "../components/loading/LoadingFS";
import { isArabic } from "../../utils/langType";

const SuggestionsDataTable = (props) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(6);
  const { data, loading, btnLoading, totalItems } = useSelector(
    (state) => state.suggestions
  );
  useEffect(() => {
    let info = { size: basicRows, page: currentPage };
    dispatch(GetSuggestions(info));
  }, []);

  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { size: basicRows, page: currentPage };
    dispatch(GetSuggestions(info));
  };
  return (
    <>
      {loading && <LoadingFS />}
      <div className="suggestions-datatable">
        <div className="suggestions">
          {data.map((suggestion) => (
            <div key={suggestion.id} className="suggestion text-break">
              <div
                className={`title ${
                  isArabic(suggestion.title) ? "arabic" : "english"
                }`}
              >
                {suggestion.title}
              </div>
              <div
                className={`description ${
                  isArabic(suggestion.description) ? "arabic" : "english"
                }`}
              >
                {suggestion.description}
              </div>
            </div>
          ))}
        </div>

        <div className="action">
          <div
            className="add-suggestion"
            onClick={() => props.addSuggest(true, basicRows)}
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

export default SuggestionsDataTable;
