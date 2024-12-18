import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import DataTable from "../../../modules/DataTable";
import { useDeleteUser, useFetchUsers } from "../../../hooks/useUser";
import Search from "../../../modules/Search";
import { AppPaths } from "../../../constants/appPaths";
import Pager from "../../../modules/Pager";
import "./style.scss";
import Breadcrumb from "../Breadcrumb";

const UsersAll = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useFetchUsers();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const users = data?.data || [];
  const meta = data?.meta || {};

  const navigate = useNavigate();

  const handleDelete = async ({ id }) => {
    if (window.confirm(t("user.all.deleteConfirm"))) {
      try {
        await deleteUser(id);
        toast.success(t("user.all.deleteSuccess"));
      } catch (error) {
        toast.error(t("user.all.deleteError"));
      }
    }
  };

  const handleEdit = ({ id }) => {
    navigate(`/users/edit/${id}`);
  };

  const headItems = [
    t("user.all.name"),
    t("user.all.office"),
    t("user.all.department"),
    t("user.all.phone"),
    t("user.all.email"),
    t("user.all.role"),
    t("user.all.actions"),
  ];

  const items = users.map((user) => ({
    id: user.id,
    name: user.username,
    office: user.office,
    department: user.department,
    phone: user.phone,
    email: user.email,
    role: user.role,
  }));

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.users") },
        ]}
      />

      <div className="head-wrapper">
        <Search
          path={AppPaths.users.all}
          placeholder={t("user.all.searchPlaceholder")}
        />
        <Button type="button" variant="success" className="add-btn">
          <Link to={AppPaths.users.add}>{t("user.all.add")}</Link>
        </Button>
      </div>
      <hr className="navigation-underline" />
      <DataTable
        headItems={headItems}
        items={items}
        isLoading={isLoading}
        withAction
        actionItems={[
          {
            text: <FaEdit />,
            variant: "warning",
            tooltip: t("user.all.edit"),
            onClick: handleEdit,
          },
          {
            text: <FaRegTrashAlt />,
            variant: "danger",
            tooltip: t("user.all.delete"),
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

export default UsersAll;
