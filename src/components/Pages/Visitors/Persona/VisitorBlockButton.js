import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Modal from "../../../../modules/Modal";
import { FaLock, FaLockOpen } from "react-icons/fa";
import {
  useBlockVisitor,
  useUnBlockVisitor,
} from "../../../../hooks/useVisitors";
import { isAdmin } from "../../../../helpers/userHelpers";

const VisitorBlockButton = ({ visitor, isBlocked = false }) => {
  const { t } = useTranslation();
  const { mutateAsync: blockVisitor, isPending: isBlockPending } =
    useBlockVisitor();
  const { mutateAsync: unblockVisitor, isPending: isUnblockPending } =
    useUnBlockVisitor();

  if (!visitor || !isAdmin()) {
    return null;
  }

  const handleConfirmBlock = async () => {
    try {
      await (isBlocked
        ? unblockVisitor({ docId: visitor.doc_id, id: visitor.id })
        : blockVisitor(visitor.id));

      toast.success(
        t(
          isBlocked
            ? "visitorBlockModal.unblockSuccess"
            : "visitorBlockModal.success",
        ),
      );
    } catch (error) {
      toast.error(
        t(
          isBlocked
            ? "visitorBlockModal.unblockError"
            : "visitorBlockModal.error",
        ),
      );
    }
  };

  return (
    <>
      <Modal
        btnText={isBlocked ? <FaLockOpen /> : <FaLock />}
        title={t("visitorBlockModal.title")}
        onConfirm={handleConfirmBlock}
        btnProps={{
          variant: isBlocked ? "success" : "danger",
          disabled: isBlockPending || isUnblockPending,
          tooltip: isBlocked
            ? t("visitorBlockModal.unblock")
            : t("visitorBlockModal.block"),
        }}
      >
        <h4 className="warning-text">
          {isBlocked
            ? t("visitorBlockModal.unblockWarning")
            : t("visitorBlockModal.blockWarning")}
        </h4>
      </Modal>
    </>
  );
};

export default VisitorBlockButton;
