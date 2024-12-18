import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ErrorPage.scss";

const InternalServer = () => {
  const { t } = useTranslation();

  return (
    <div className="error-container">
      <div className="error-content text-center">
        <h1 className="display-1 text-danger">
          {t("error.internalServer.title")}
        </h1>
        <h2 className="text-muted">{t("error.internalServer.message")}</h2>
        <p>{t("error.internalServer.description")}</p>
        <Link to="/" className="btn-error btn-primary">
          {t("error.internalServer.goHome")}
        </Link>
      </div>
    </div>
  );
};

export default InternalServer;
