import PropTypes from "prop-types";
import React from "react";
import "./LoadingTable.scss";

const LoadingTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="loading-table">
      <table>
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <th key={`header-${colIndex}`} className="loading-header">
                <div className="loading-placeholder"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="loading-cell"
                >
                  <div className="loading-placeholder"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

LoadingTable.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
};

export default LoadingTable;
