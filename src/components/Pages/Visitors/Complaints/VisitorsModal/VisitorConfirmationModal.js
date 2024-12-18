import React from "react";
import { Modal as CoreModal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const VisitorConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  isBlocked,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <CoreModal show={show} onHide={onClose} centered>
      <CoreModal.Header closeButton>
        <CoreModal.Title>
          {isBlocked ? t("unblockConfirmTitle") : t("blockConfirmTitle")}
        </CoreModal.Title>
      </CoreModal.Header>
      <CoreModal.Body>
        {isBlocked ? t("unblockConfirmMessage") : t("blockConfirmMessage")}
      </CoreModal.Body>
      <CoreModal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button
          variant={isBlocked ? "outline-success" : "outline-danger"}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? t("loading") : t("confirm")}
        </Button>
      </CoreModal.Footer>
    </CoreModal>
  );
};

export default VisitorConfirmationModal;
