import React from "react";
import { useTranslation } from "react-i18next";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "./style.scss";
import { format } from "date-fns";
import ActionButton from "modules/ActionButton";
import { useDeleteComplaint } from "@hooks/useComplaints";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

const ComplaintsList = ({ complaints, complaintsLoading }) => {
  const { t } = useTranslation();
  const { mutateAsync: deleteComplaint } = useDeleteComplaint();

  const handleDelete = async (complaint) => {
    try {
      await deleteComplaint(complaint.id);
      toast.success(t("complaints.all.deleteSuccess"));
    } catch (error) {
      console.error("Error deleting complaint:", error);
      toast.error(t("complaints.all.deleteError"));
    }
  };

  return (
    <div className="visitor-complaints">
      {complaintsLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">{t("loading")}</span>
          </Spinner>
        </div>
      ) : complaints.length > 0 ? (
        complaints.map((complaint) => (
          <Card key={complaint.id} className="mb-3">
            <Card.Body>
              <blockquote className="blockquote mb-0 d-flex justify-content-between align-items-center">
                <p>{complaint.description}</p>
                <ActionButton
                  tooltip={t("complaints.all.delete")}
                  variant="danger"
                  text={<FaRegTrashAlt />}
                  onClick={() => handleDelete(complaint)}
                />
              </blockquote>
            </Card.Body>
            <Card.Footer>
              {t("complaints.all.reportedBy")}:{" "}
              {complaint.reported_by || t("complaints.all.unknown")} |{" "}
              {t("complaints.all.complainedAt")}:{" "}
              {complaint.created_at
                ? format(new Date(complaint.created_at), "dd/MM/yyyy HH:mm")
                : t("complaints.all.unknown")}
            </Card.Footer>
          </Card>
        ))
      ) : (
        <p>{t("complaints.all.noResults")}</p>
      )}
    </div>
  );
};

export default ComplaintsList;
