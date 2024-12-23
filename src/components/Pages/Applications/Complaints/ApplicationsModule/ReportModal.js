import React from "react";
import Modal from "../../../../../modules/Modal";
import { useTranslation } from "react-i18next";
import { useAddComplaint } from "../../../../../hooks/useComplaints";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

import "./ReportModal.scss";
import { FaExclamationTriangle } from "react-icons/fa";

const ReportModal = ({
  description,
  setDescription,
  id,
  onUpdateComplaints,
}) => {
  const { t } = useTranslation();
  const { mutateAsync } = useAddComplaint();

  const submitReport = async () => {
    if (!description.trim()) {
      toast.error(t("applications.view.emptyDescriptionError"));
      return;
    }

    try {
      const newReportData = {
        description,
        application_id: id,
      };
      await mutateAsync(newReportData);
      onUpdateComplaints();
      toast.success(t("applications.view.successReport"));
    } catch (error) {
      console.error(error);
      toast.error(t("applications.view.errorReport"));
    }
  };

  return (
    <Modal
      btnText={<FaExclamationTriangle />}
      onConfirm={submitReport}
      title={t("applications.view.report")}
      btnProps={{ variant: "warning", tooltip: t("applications.view.report") }}
    >
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            autoFocus
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </Form.Group>
      </Form>
      <div className="modal-buttons"></div>
    </Modal>
  );
};

export default ReportModal;
