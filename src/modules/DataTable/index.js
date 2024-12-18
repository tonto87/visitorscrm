import React from "react";
import Table from "react-bootstrap/Table";
import Item from "./Item";
import "./styles.scss";
import LoadingTable from "../Loading/Table";
import { useTranslation } from "react-i18next";
import ActionButton from "../ActionButton";

const DataTable = ({
  headItems,
  items,
  tableProps = { striped: false, bordered: true, hover: true },
  actionItems,
  isLoading,
}) => {
  const { t } = useTranslation();
  if (!items || isLoading) {
    return <LoadingTable />;
  }

  return (
    <div className="data-table-container">
      <Table {...tableProps} className="data-table">
        <thead>
          <tr>
            {headItems.map((item) => (
              <th key={"head-item" + item} className="table-header">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={headItems.length} className="text-center no-data">
                {t("noDataFound")}
              </td>
            </tr>
          )}
          {items.map((item, index) => (
            <tr
              key={item.id || index}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <Item data={item} />

              {actionItems && (
                <td className="table-actions">
                  <div className="action-buttons">
                    {actionItems.map((action, idx) => (
                      <ActionButton
                        key={idx}
                        {...action}
                        onClick={() => action.onClick(item)}
                      />
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
