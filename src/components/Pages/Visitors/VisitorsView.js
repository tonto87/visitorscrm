import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import {
  useFetchVisitorComplaints,
  useFetchVisitorById,
  useStartVisit,
  useEndVisit,
} from "../../../hooks/useVisitors";
import Breadcrumb from "../Breadcrumb";
import Avatar from "../../../modules/Avatar";
import ReportModal from "./Complaints/VisitorsModal/ReportModal";
import VisitorBlockButton from "./Persona/VisitorBlockButton";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingForm from "../../../modules/Loading/Form";
import ItemsTable from "./ItemsTable";
import "./style.scss";
import { FaTimesCircle } from "react-icons/fa";
import { isAdmin, isReception } from "../../../helpers/userHelpers";
import { AppPaths } from "../../../constants/appPaths";

const VisitorsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: visitorData } = useFetchVisitorById(id);
  const { mutateAsync: startVisit } = useStartVisit();
  const { mutateAsync: endVisit } = useEndVisit();

  const visitor = visitorData?.data;
  const { refetch: refetchComplaints } = useFetchVisitorComplaints(id);

  const [description, setDescription] = useState("");

  if (!visitor) {
    return <LoadingForm />;
  }

  const handleStartVisit = async () => {
    try {
      await startVisit(visitor.id);
      toast.success(t("visitors.view.startVisitSuccess"));
    } catch (error) {
      console.error("Error starting visit:", error);
      toast.error(t("visitors.view.startVisitError"));
    }
  };

  const handleEndVisit = async () => {
    try {
      await endVisit(visitor.id);
      toast.success(t("visitors.view.endVisitSuccess"));
    } catch (error) {
      console.error("Error ending visit:", error);
      toast.error(t("visitors.view.endVisitError"));
    }
  };

  const handleNavigateToComplaints = ({ id }) => {
    navigate(`/visitors/complaints/${visitor.id}`);
  };

  return (
    <div className="user-container">
      <div className="head-wrapper">
        <Breadcrumb
          paths={[
            { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
            { label: t("breadcrumbs.visitors"), to: AppPaths.visitors.all },
            { label: t("breadcrumbs.showVisitor") },
          ]}
        />
        {isReception() && (
          <>
            {!visitor.visit_start_date && (
              <Button onClick={handleStartVisit}>
                {t("visitors.view.startVisit")}
              </Button>
            )}
            {visitor.visit_start_date && !visitor.visit_end_date && (
              <Button variant="danger" onClick={handleEndVisit}>
                {t("visitors.view.endVisit")}
              </Button>
            )}
          </>
        )}
      </div>
      <div className="visitor-view">
        {visitor.is_blocked && (
          <div className="blocked-overlay">
            <FaTimesCircle />
            <span>{t("visitors.view.blocked")}</span>
          </div>
        )}
        <div
          className={`visitor-view-header ${visitor.is_blocked ? "blocked" : ""}`}
        >
          <div className="visitor-view-photo">
            <Avatar size="128px" src={visitor.avatar} alt={visitor.name} />
          </div>
          <div className="visitor-view-info">
            <p>
              <strong>{t("visitors.view.name")}:</strong> {visitor.name}
            </p>
            <p>
              <strong>{t("visitors.view.fin")}:</strong> {visitor.doc_id}
            </p>
            <p>
              <strong>{t("visitors.view.phone")}:</strong> {visitor.phone}
            </p>
            <p>
              <strong>{t("visitors.view.email")}:</strong> {visitor.email}
            </p>
            <p>
              <strong>{t("visitors.view.address")}:</strong> {visitor.address}
            </p>
          </div>
          <div className="visitor-view-btns">
            <VisitorBlockButton
              isBlocked={visitor.is_blocked}
              visitor={visitor}
            />
            <ReportModal
              description={description}
              setDescription={setDescription}
              id={visitor.id}
              onUpdateComplaints={refetchComplaints}
            />
          </div>
        </div>
        <div className="visitor-view-footer">
          {visitor.items.length > 0 && (
            <div className="view-cursor">
              <h4>{t("visitors.view.items")}</h4>
              <ItemsTable canAdd={false} initialItems={visitor.items} />
            </div>
          )}
          {isAdmin() && (
            <h4 className="view-cursor" onClick={handleNavigateToComplaints}>
              {t("visitors.view.complaints")}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorsView;
