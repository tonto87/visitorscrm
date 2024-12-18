import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ErrorPage.scss";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="error-container">
      <div className="error-content text-center">
        <h1 className="display-1 text-danger">{t("error.notFound.title")}</h1>
        <h2 className="text-muted">{t("error.notFound.message")}</h2>
        <p>{t("error.notFound.description")}</p>
        <Link to="/" className="btn-error btn-primary">
          {t("error.notFound.goHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
