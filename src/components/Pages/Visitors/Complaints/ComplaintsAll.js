import React from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchComplaints } from "../../../../hooks/useComplaints";
import DataTable from "../../../../modules/DataTable";
import Breadcrumb from "../../Breadcrumb";
import { AppPaths } from "../../../../constants/appPaths";
import LoadingTable from "../../../../modules/Loading/Table";

const ComplaintsAll = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useFetchComplaints();
  const navigate = useNavigate();

  const complaints = data?.data;

  const handleView = ({ id }) => {
    const complaint = complaints.find((c) => c.id === id);
    navigate(`/visitors/view/${complaint.visitor_id}`);
  };

  if (isLoading) return <LoadingTable />;

  const headItems = [
    t("complaints.all.name"),
    t("complaints.all.date"),
    t("complaints.all.description"),
    t("complaints.all.actions"),
  ];

  const items = complaints?.map((complaint, index) => ({
    id: complaint.id,
    name: complaint.visitor,
    date: new Date(complaint.created_at).toLocaleDateString(),
    description: complaint.description,
  }));

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.complaints") },
        ]}
      />
      <DataTable
        isLoading={isLoading}
        headItems={headItems}
        items={items}
        actionItems={[{ text: <FaEye />, onClick: handleView }]}
      />
    </div>
  );
};

export default ComplaintsAll;
