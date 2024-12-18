import React from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import { useDeleteOffice, useFetchOffices } from "../../../hooks/useOffices";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import Search from "../../../modules/Search";
import Pager from "../../../modules/Pager";
import { Button } from "react-bootstrap";

const OfficeAll = () => {
  const { data, isLoading } = useFetchOffices();
  const { mutateAsync } = useDeleteOffice();
  const offices = data?.data;
  const meta = data?.meta;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = async ({ id }) => {
    if (window.confirm(t("office.all.deleteConfirm"))) {
      try {
        await mutateAsync(id);
        toast.success(t("office.all.deleteSuccess"));
      } catch (error) {
        toast.error(t("office.all.deleteError"));
      }
    }
  };

  const handleEdit = ({ id }) => {
    navigate(`/offices/edit/${id}`);
  };

  const headItems = [
    t("office.all.name"),
    t("office.all.address"),
    t("office.all.phone"),
    t("office.all.actions"),
  ];

  const items = offices?.map((office, index) => ({
    id: office.id,
    name: office.name,
    address: office.address,
    phone: office.phone,
  }));

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.offices"), to: AppPaths.offices.all },
        ]}
      />
      <div className="head-wrapper">
        <Search
          path={AppPaths.offices.all}
          placeholder={t("office.all.searchPlaceholder")}
        />
        <Button type="button" variant="success" className="add-btn">
          <Link to={AppPaths.offices.add}>{t("office.all.add")}</Link>
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
            tooltip: t("office.all.edit"),
            onClick: handleEdit,
          },
          {
            text: <FaRegTrashAlt />,
            variant: "danger",
            tooltip: t("office.all.delete"),
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

export default OfficeAll;
