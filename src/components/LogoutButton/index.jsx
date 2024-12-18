import React from "react";
import "./style.scss";
import { FaPowerOff } from "react-icons/fa";

const LogoutButton = ({ onClick, text }) => {
  return (
    <div className="logout" onClick={onClick}>
      {text && (
        <span className="logout-text" onClick={onClick}>
          {text}
        </span>
      )}
      <FaPowerOff className="logout-icon" />
    </div>
  );
};

export default LogoutButton;
