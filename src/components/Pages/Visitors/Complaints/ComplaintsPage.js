import React from "react";
import { useParams } from "react-router-dom";
import { useFetchVisitorComplaints } from "../../../../hooks/useVisitors";
import ComplaintsList from "./ComplaintsList";
import { AppPaths } from "../../../../constants/appPaths";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../Breadcrumb";

import "./style.scss";

const ComplaintsPage = (handleToggleComplaints) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: complaints, isLoading: complaintsLoading } =
    useFetchVisitorComplaints(id);

  const complaintsData = complaints?.data || [];

  return (
    <div className="complaints-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          {
            label: t("breadcrumbs.visitors"),
            to: `${AppPaths.visitors.view.replace("/:id", "")}/${id}`,
          },
          {
            label: t("breadcrumbs.showVisitor"),
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
