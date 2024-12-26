import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useFetchApplicationById } from "../../../hooks/useApplications";
import Breadcrumb from "../Breadcrumb";
import LoadingForm from "../../../modules/Loading/Form";
import "./style.scss";
import { AppPaths } from "../../../constants/appPaths";

const ApplicationsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { data: applicationData } = useFetchApplicationById(id);

  const application = applicationData?.data;
  console.log({ application });

  if (!application) {
    return <LoadingForm />;
  }

  return (
    <div className="user-container">
      <div className="head-wrapper">
        <Breadcrumb
          paths={[
            { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
            {
              label: t("breadcrumbs.applications"),
              to: AppPaths.applications.all,
            },
            { label: t("breadcrumbs.showapplication") },
          ]}
        />
      </div>
      <div className="application-view">
        <div className={`application-view-header`}>
          <div className="application-view-info">
            <p>
              <strong>{t("applications.view.name")}:</strong> {application.name}
            </p>
            <p>
              <strong>{t("applications.view.fin")}:</strong>{" "}
              {application.doc_id}
            </p>
            <p>
              <strong>{t("applications.add.officer_name")}:</strong>{" "}
              {application.officer}
            </p>
            <p>
              <strong>{t("applications.view.phone")}:</strong>{" "}
              {application.phone}
            </p>
            <p>
              <strong>{t("applications.view.email")}:</strong>{" "}
              {application.email}
            </p>
            <p>
              <strong>{t("applications.view.address")}:</strong>{" "}
              {application.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsView;
