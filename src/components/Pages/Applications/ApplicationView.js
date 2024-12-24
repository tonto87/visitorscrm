import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import {
  useFetchApplicationComplaints,
  useFetchApplicationById,
  useStartVisit,
  useEndVisit,
} from "../../../hooks/useApplications";
import Breadcrumb from "../Breadcrumb";
import Avatar from "../../../modules/Avatar";
import ReportModal from "./Complaints/ApplicationsModule/ReportModal";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingForm from "../../../modules/Loading/Form";
import ItemsTable from "./ItemsTable";
import "./style.scss";
import { FaTimesCircle } from "react-icons/fa";
import { isAdmin, isReception } from "../../../helpers/userHelpers";
import { AppPaths } from "../../../constants/appPaths";

const ApplicationsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: applicationData } = useFetchApplicationById(id);
  const { mutateAsync: startVisit } = useStartVisit();
  const { mutateAsync: endVisit } = useEndVisit();

  const application = applicationData?.data;
  const { refetch: refetchComplaints } = useFetchApplicationComplaints(id);

  const [description, setDescription] = useState("");

  if (!application) {
    return <LoadingForm />;
  }

  const handleStartVisit = async () => {
    try {
      await startVisit(application.id);
      toast.success(t("applications.view.startVisitSuccess"));
    } catch (error) {
      console.error("Error starting visit:", error);
      toast.error(t("applications.view.startVisitError"));
    }
  };

  const handleEndVisit = async () => {
    try {
      await endVisit(application.id);
      toast.success(t("applications.view.endVisitSuccess"));
    } catch (error) {
      console.error("Error ending visit:", error);
      toast.error(t("applications.view.endVisitError"));
    }
  };

  const handleNavigateToComplaints = ({ id }) => {
    navigate(`/applications/complaints/${application.id}`);
  };

  return (
    <div className="user-container">
      <div className="head-wrapper">
        <Breadcrumb
          paths={[
            { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
            {
              label: t("breadcrumbs.applications"),
              to: AppPaths.applications.all,
            },
            { label: t("breadcrumbs.showapplication") },
          ]}
        />
        {isReception() && (
          <>
            {!application.visit_start_date && (
              <Button onClick={handleStartVisit}>
                {t("applications.view.startVisit")}
              </Button>
            )}
            {application.visit_start_date && !application.visit_end_date && (
              <Button variant="danger" onClick={handleEndVisit}>
                {t("applications.view.endVisit")}
              </Button>
            )}
          </>
        )}
      </div>
      <div className="application-view">
        {application.is_blocked && (
          <div className="blocked-overlay">
            <FaTimesCircle />
            <span>{t("applications.view.blocked")}</span>
          </div>
        )}
        <div
          className={`application-view-header ${application.is_blocked ? "blocked" : ""}`}
        >
          <div className="application-view-photo">
            <Avatar
              size="128px"
              src={application.avatar}
              alt={application.name}
            />
          </div>
          <div className="application-view-info">
            <p>
              <strong>{t("applications.view.name")}:</strong> {application.name}
            </p>
            <p>
              <strong>{t("applications.view.fin")}:</strong>{" "}
              {application.doc_id}
            </p>
            <p>
              <strong>{t("applications.view.phone")}:</strong>{" "}
              {application.phone}
            </p>
            <p>
              <strong>{t("applications.view.email")}:</strong>{" "}
              {application.email}
            </p>
            <p>
              <strong>{t("applications.view.address")}:</strong>{" "}
              {application.address}
            </p>
          </div>
          <div className="application-view-btns">
            <ReportModal
              description={description}
              setDescription={setDescription}
              id={application.id}
              onUpdateComplaints={refetchComplaints}
            />
          </div>
        </div>
        <div className="application-view-footer">
          {application.items.length > 0 && (
            <div className="view-cursor">
              <h4>{t("applications.view.items")}</h4>
              <ItemsTable canAdd={false} initialItems={application.items} />
            </div>
          )}
          {isAdmin() && (
            <h4 className="view-cursor" onClick={handleNavigateToComplaints}>
              {t("applications.view.complaints")}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsView;
