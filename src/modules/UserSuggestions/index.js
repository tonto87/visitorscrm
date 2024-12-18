import React, { useEffect } from "react";
import Avatar from "../Avatar";
import "./UserSuggestion.scss";
import { useInfoByDoc } from "../../hooks/useVisitors";
import { useDebounce } from "../../hooks/useDebounce";

const UserSuggestion = ({ docType, docId, onSelect, show }) => {
  const { mutateAsync: fetchInfoData, data: docsData } = useInfoByDoc();
  const docsInfo = docsData?.data;

  const debounceValue = useDebounce(docId, 500);

  useEffect(() => {
    if (debounceValue && docType) {
      fetchInfoData({ doc_type: docType, doc_number: debounceValue });
    }
  }, [docType, debounceValue, fetchInfoData]);

  if (!docsInfo || docsInfo.length === 0 || !show) {
    return <></>;
  }

  return (
    <div className="user-suggest">
      <ul className="user-suggest__list">
        {docsInfo.map((item, index) => (
          <li
            className="user-suggest__list-item"
            onClick={() => onSelect(item)}
            key={index}
          >
            <div className="user-suggest__avatar">
              <Avatar size="24px" src={item.avatar} alt={item.name} />
            </div>
            <div className="user-suggest__info">
              <h4>{item.name}</h4>
              <p>{item.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSuggestion;
