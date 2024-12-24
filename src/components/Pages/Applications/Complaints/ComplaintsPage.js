import React from "react";
import { useParams } from "react-router-dom";
import { useFetchApplicationComplaints } from "../../../../hooks/useApplications";
import ComplaintsList from "./ComplaintsList";
import { AppPaths } from "../../../../constants/appPaths";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../Breadcrumb";

import "./style.scss";

const ComplaintsPage = (handleToggleComplaints) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: complaints, isLoading: complaintsLoading } =
    useFetchApplicationComplaints(id);

  const complaintsData = complaints?.data || [];

  return (
    <div className="complaints-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          {
            label: t("breadcrumbs.applications"),
            to: `${AppPaths.applications.view.replace("/:id", "")}/${id}`,
          },
          {
            label: t("breadcrumbs.showApplication"),
          },
        ]}
      />
      <ComplaintsList
        complaints={complaintsData}
        complaintsLoading={complaintsLoading}
        onToggle={handleToggleComplaints}
      />
    </div>
  );
};

export default ComplaintsPage;
