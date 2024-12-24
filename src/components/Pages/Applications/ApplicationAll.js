import React from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { AppPaths } from "../../../constants/appPaths";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import {
  useDeleteApplication,
  useFetchApplications,
} from "../../../hooks/useApplications";
import Pager from "../../../modules/Pager";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Search from "../../../modules/Search";
import CountUp from "../../../modules/CountUp";
import { isAdmin } from "@helpers/userHelpers";

const ApplicationsAll = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, error } = useFetchApplications();
  const { mutateAsync } = useDeleteApplication();

  if (error) {
    console.error(t("errorFetchingApplications"), error);
    return <div>{t("errorFetchingApplicationsMessage")}</div>;
  }

  const applications = data?.data || [];
  const meta = data?.meta;

  const handleDelete = async ({ id }) => {
    if (window.confirm(t("applications.all.deleteConfirm"))) {
      try {
        await mutateAsync(id);
        toast.success(t("applications.all.deleteSuccess"));
      } catch (error) {
        console.error(t("errorDeletingapplication"), error);
        toast.error(t("applications.all.deleteError"));
      }
    }
  };

  const handleEdit = ({ id }) => {
    navigate(`/applications/edit/${id}`);
  };

  const handleView = ({ id }) => {
    navigate(`/applications/view/${id}`);
  };

  const headItems = [
    t("applications.all.name"),
    t("applications.all.fin"),
    t("applications.all.email"),
    t("applications.all.phone"),
    t("applications.all.visitTime"),
    t("applications.all.visitTimeCount"),
    t("applications.all.actions"),
  ];

  const items = applications.map((application, index) => ({
    id: application.id,
    name: application.name,
    doc_id: application.doc_id,
    email: application.email || "N/A",
    phone: application.phone || "N/A",
    visit_time: format(new Date(application.visit_time * 1000), "dd MMM HH:mm"),
    visit_time_count: (
      <CountUp
        start={application.visit_start_date}
        end={application.visit_end_date}
      />
    ),
  }));

  const actionItems = [
    {
      text: <FaEye />,
      variant: "primary",
      tooltip: t("applications.all.view"),
      onClick: handleView,
    },
    {
      text: <FaEdit />,
      variant: "warning",
      tooltip: t("applications.all.edit"),
      onClick: handleEdit,
    },
  ];

  if (isAdmin()) {
    actionItems.push({
      text: <FaRegTrashAlt />,
      variant: "danger",
      tooltip: t("applications.all.delete"),
      onClick: handleDelete,
    });
  }

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.applications") },
        ]}
      />

      <div className="head-wrapper">
        <Search
          path={AppPaths.applications.all}
          placeholder={t("applications.all.searchPlaceholder")}
        />

        <Button type="button" variant="success" className="add-btn">
          <Link to={AppPaths.applications.add}>
            {t("applications.all.add")}
          </Link>
        </Button>
      </div>
      <hr className="navigation-underline" />

      <DataTable
        isLoading={isLoading}
        withAction
        headItems={headItems}
        items={items}
        actionItems={actionItems}
      />

      <Pager
        currentPage={meta?.current_page}
        hasNext={meta?.has_next}
        totalPage={meta?.total_page}
      />
    </div>
  );
};

export default ApplicationsAll;
