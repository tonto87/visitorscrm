import React from "react";

const Item = ({ data }) => {
  return Object.entries(data).map(
    ([key, item], index) =>
      key !== "id" && (
        <td key={index}>
          <div className="data-table-item">{item}</div>
        </td>
      ),
  );
};

export default Item;
