import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ErrorPage.scss";

const Forbidden = () => {
  const { t } = useTranslation();

  return (
    <div className="error-container">
      <div className="error-content text-center">
        <h1 className="display-1 text-danger">{t("error.forbidden.title")}</h1>
        <h2 className="text-muted">{t("error.forbidden.message")}</h2>
        <p>{t("error.forbidden.description")}</p>
        <Link to="/" className="btn-error btn-primary">
          {t("error.forbidden.goHome")}
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
