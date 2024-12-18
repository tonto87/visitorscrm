import React from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import {
  useDeleteDepartment,
  useFetchDepartments,
} from "../../../hooks/useDepartments";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import Pager from "../../../modules/Pager";
import Search from "../../../modules/Search";
import { Button } from "react-bootstrap";

const DepartmentsAll = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading } = useFetchDepartments();
  const departments = data?.data;
  const meta = data?.meta;

  const { mutateAsync: deleteDepartment } = useDeleteDepartment();

  const handleDelete = async (id) => {
    if (window.confirm(t("department.all.deleteConfirm"))) {
      try {
        await deleteDepartment(id);
        toast.success(t("department.all.deleteSuccess"));
      } catch (error) {
        toast.error(t("department.all.deleteError"));
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/departments/edit/${id}`);
  };

  const headItems = [
    t("department.all.name"),
    t("department.all.phone"),
    t("department.all.office"),
    t("department.all.actions"),
  ];

  const items = departments?.map((department) => ({
    id: department.id,
    departmentName: department.name,
    phone: department.phone,
    office: department.office,
  }));

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          {
            label: t("breadcrumbs.departments"),
            to: AppPaths.departments.all,
          },
        ]}
      />
      <div className="head-wrapper">
        <Search
          path={AppPaths.departments.all}
          placeholder={t("department.all.searchPlaceholder")}
        />

        <Button type="button" variant="success" className="add-btn">
          <Link to={AppPaths.departments.add}>{t("department.all.add")}</Link>
        </Button>
      </div>
      <hr className="navigation-underline" />

      <DataTable
        isLoading={isLoading}
        withAction
        headItems={headItems}
        tableProps={{ striped: true, bordered: true, hover: true }}
        items={items}
        actionItems={[
          {
            text: <FaEdit />,
            variant: "warning",
            tooltip: t("department.all.edit"),
            onClick: ({ id }) => handleEdit(id),
          },
          {
            text: <FaRegTrashAlt />,
            variant: "danger",
            tooltip: t("department.all.delete"),
            onClick: ({ id }) => handleDelete(id),
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

export default DepartmentsAll;
