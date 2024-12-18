import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./BreadcrumpStyle.scss";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="breadcrumbs">
      {paths.map((path, index) => (
        <span key={index}>
          {path.to ? (
            <Link to={path.to}>{path.label}</Link>
          ) : (
            <span>{path.label}</span>
          )}
          {index < paths.length - 1 && " > "}
        </span>
      ))}
    </nav>
  );
};

Breadcrumb.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    }),
  ).isRequired,
};

export default Breadcrumb;
