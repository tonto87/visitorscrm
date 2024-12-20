import React from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import { useDeleteOfficer, useFetchOfficers } from "../../../hooks/useOfficers";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import Search from "../../../modules/Search";
import Pager from "../../../modules/Pager";
import { Button } from "react-bootstrap";

const OfficerAll = () => {
  const { data, isLoading } = useFetchOfficers();
  const { mutateAsync } = useDeleteOfficer();
  const officers = data?.data;
  const meta = data?.meta;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = async ({ id }) => {
    if (window.confirm(t("officer.all.deleteConfirm"))) {
      try {
        await mutateAsync(id);
        toast.success(t("officer.all.deleteSuccess"));
      } catch (error) {
        toast.error(t("officer.all.deleteError"));
      }
    }
  };

  const handleEdit = ({ id }) => {
    navigate(`/officers/edit/${id}`);
  };

  const headItems = [
    t("officer.all.name"),
    t("officer.all.surname"),
    t("officer.all.position"),
    t("officer.all.actions"),
  ];

  const items = officers?.map((officer, index) => ({
    id: officer.id,
    name: officer.name,
    surname: officer.surname,
    position: officer.position,
  }));

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.officers"), to: AppPaths.officers.all },
        ]}
      />
      <div className="head-wrapper">
        <Search
          path={AppPaths.officers.all}
          placeholder={t("officer.all.searchPlaceholder")}
        />
        <Button type="button" variant="success" className="add-btn">
          <Link to={AppPaths.officers.add}>{t("officer.all.add")}</Link>
        </Button>
      </div>
      <hr className="navigation-underline" />

      <DataTable
        isLoading={isLoading}
        withAction
        headItems={headItems}
        items={items}
        actionItems={[
          {
            text: <FaEdit />,
            variant: "warning",
            tooltip: t("officer.all.edit"),
            onClick: handleEdit,
          },
          {
            text: <FaRegTrashAlt />,
            variant: "danger",
            tooltip: t("officer.all.delete"),
            onClick: handleDelete,
          },
        ]}
      />

      <Pager
        currentPage={meta?.current_page}
        hasNext={meta?.has_next}
        totalPage={meta?.total_page}
      />
    </div>
  );
};

export default OfficerAll;
