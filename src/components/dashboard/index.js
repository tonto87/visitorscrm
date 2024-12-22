import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./dashboardStyle.scss";
import { AppPaths } from "../../constants/appPaths";
import DataTable from "../../modules/DataTable";
import { useFetchOffices } from "../../hooks/useOffices";
import { useFetchDepartments } from "../../hooks/useDepartments";
import { useFetchVisitors } from "../../hooks/useVisitors";
import { useFetchUsers } from "../../hooks/useUser";
import LoadingTable from "../../modules/Loading/Table";
import { isAdmin } from "../../helpers/userHelpers";

const Dashboard = () => {
  const enabled = isAdmin();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: officeData, isLoading: isOfficesLoading } =
    useFetchOffices(enabled);
  const offices = officeData?.data || [];

  const { data: departmentsData, isLoading: isDepartmentsLoading } =
    useFetchDepartments(enabled);
  const departments = departmentsData?.data || [];

  const { data: visitorsData, isLoading: isVisitorsLoading } =
    useFetchVisitors();
  const visitors = visitorsData?.data || [];

  const { data: usersData, isLoading: isUsersLoading } = useFetchUsers(enabled);
  const users = usersData?.data || [];

  if (
    isOfficesLoading ||
    isDepartmentsLoading ||
    isVisitorsLoading ||
    isUsersLoading
  ) {
    return <LoadingTable />;
  }

  const sortedOffices = offices.sort((a, b) => b.id - a.id).slice(-3);
  const sortedDepartments = departments.sort((a, b) => b.id - a.id).slice(-3);
  const sortedVisitors = visitors.sort((a, b) => b.id - a.id).slice(-3);
  const sortedUsers = users.sort((a, b) => b.id - a.id).slice(-3);

  const handleViewAll = (path) => navigate(path);

  return (
    <Container fluid>
      <div className="w-100 d-flex mb-4 justify-content-end">
        <Button
          variant="success"
          onClick={() => navigate(AppPaths.visitors.add)}
        >
          {t("dashboard.actions.addVisitor")}
        </Button>
      </div>
      <Section
        title={t("dashboard.sections.visitors.title")}
        data={sortedVisitors}
        fields={["doc_id", "name", "phone", "email"]}
        headers={[
          t("dashboard.sections.visitors.headers.doc_id"),
          t("dashboard.sections.visitors.headers.name"),
          t("dashboard.sections.visitors.headers.phone"),
          t("dashboard.sections.visitors.headers.email"),
        ]}
        noDataMessage={t("dashboard.sections.visitors.noData")}
        onViewAll={() => handleViewAll(AppPaths.visitors.all)}
      />

      <Section
        enabled={enabled}
        title={t("dashboard.sections.offices.title")}
        data={sortedOffices}
        fields={["name", "address", "phone"]}
        headers={[
          t("dashboard.sections.offices.headers.name"),
          t("dashboard.sections.offices.headers.address"),
          t("dashboard.sections.offices.headers.phone"),
        ]}
        noDataMessage={t("dashboard.sections.offices.noData")}
        onViewAll={() => handleViewAll(AppPaths.offices.all)}
      />

      <Section
        enabled={enabled}
        title={t("dashboard.sections.departments.title")}
        data={sortedDepartments}
        fields={["name", "phone", "office"]}
        headers={[
          t("dashboard.sections.departments.headers.name"),
          t("dashboard.sections.departments.headers.phone"),
          t("dashboard.sections.departments.headers.office"),
        ]}
        noDataMessage={t("dashboard.sections.departments.noData")}
        onViewAll={() => handleViewAll(AppPaths.departments.all)}
      />

      <Section
        enabled={enabled}
        title={t("dashboard.sections.users.title")}
        data={sortedUsers}
        fields={["name", "email", "role", "office", "department"]}
        headers={[
          t("dashboard.sections.users.headers.name"),
          t("dashboard.sections.users.headers.email"),
          t("dashboard.sections.users.headers.role"),
          t("dashboard.sections.departments.headers.office"),
          t("dashboard.sections.users.headers.department"),
        ]}
        noDataMessage={t("dashboard.sections.users.noData")}
        onViewAll={() => handleViewAll(AppPaths.users.all)}
      />
    </Container>
  );
};

const Section = ({
  title,
  data,
  headers,
  fields,
  noDataMessage,
  onViewAll,
  enabled = true,
}) => {
  const { t } = useTranslation();

  if (!enabled) {
    return <></>;
  }

  const items = data.map((item) => ({
    ...fields.reduce((acc, field) => {
      acc[field] = item[field];
      return acc;
    }, {}),
  }));

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h4>{title}</h4>
        <Button variant="success" onClick={onViewAll}>
          {t("dashboard.actions.openFullList")}
        </Button>
      </div>
      <DataTable
        headItems={headers}
        items={items}
        noDataMessage={noDataMessage}
      />
    </div>
  );
};

export default Dashboard;
