import React from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { AppPaths } from "../../../constants/appPaths";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import { useDeleteVisitor, useFetchVisitors } from "../../../hooks/useVisitors";
import Pager from "../../../modules/Pager";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Search from "../../../modules/Search";
import CountUp from "../../../modules/CountUp";
import { isAdmin } from "@helpers/userHelpers";

const VisitorsAll = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, error } = useFetchVisitors();
  const { mutateAsync } = useDeleteVisitor();

  if (error) {
    console.error(t("errorFetchingVisitors"), error);
    return <div>{t("errorFetchingVisitorsMessage")}</div>;
  }

  const visitors = data?.data || [];
  const meta = data?.meta;

  const handleDelete = async ({ id }) => {
    if (window.confirm(t("visitors.all.deleteConfirm"))) {
      try {
        await mutateAsync(id);
        toast.success(t("visitors.all.deleteSuccess"));
      } catch (error) {
        console.error(t("errorDeletingVisitor"), error);
        toast.error(t("visitors.all.deleteError"));
      }
    }
  };

  const handleEdit = ({ id }) => {
    navigate(`/visitors/edit/${id}`);
  };

  const handleView = ({ id }) => {
    navigate(`/visitors/view/${id}`);
  };

  const headItems = [
    t("visitors.all.name"),
    t("visitors.all.fin"),
    t("visitors.all.email"),
    t("visitors.all.phone"),
    t("visitors.all.visitTime"),
    t("visitors.all.visitTimeCount"),
    t("visitors.all.actions"),
  ];

  const items = visitors.map((visitor, index) => ({
    id: visitor.id,
    name: visitor.name,
    doc_id: visitor.doc_id,
    email: visitor.email || "N/A",
    phone: visitor.phone || "N/A",
    visit_time: format(new Date(visitor.visit_time * 1000), "dd MMM HH:mm"),
    visit_time_count: (
      <CountUp start={visitor.visit_start_date} end={visitor.visit_end_date} />
    ),
  }));

  const actionItems = [
    {
      text: <FaEye />,
      variant: "primary",
      tooltip: t("visitors.all.view"),
      onClick: handleView,
    },
    {
      text: <FaEdit />,
      variant: "warning",
      tooltip: t("visitors.all.edit"),
      onClick: handleEdit,
    },
  ];

  if (isAdmin()) {
    actionItems.push({
      text: <FaRegTrashAlt />,
      variant: "danger",
      tooltip: t("visitors.all.delete"),
      onClick: handleDelete,
    });
  }

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.visitors") },
        ]}
      />

      <div className="head-wrapper">
        <Search
          path={AppPaths.visitors.all}
          placeholder={t("visitors.all.searchPlaceholder")}
        />

        <Button type="button" variant="success" className="add-btn">
          <Link to={AppPaths.visitors.add}>{t("visitors.all.add")}</Link>
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

export default VisitorsAll;
