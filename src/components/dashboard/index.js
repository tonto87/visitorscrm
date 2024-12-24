import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FullCalendarPage } from "@components/Pages/Fullcalendar/Fullcalendar"; // Ensure this path is correct
import "./dashboardStyle.scss";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Container fluid>
      {/* FullCalendarPage component */}
      <div>
        <FullCalendarPage />
      </div>
    </Container>
  );
};

export default Dashboard;
