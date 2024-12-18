import React from "react";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ForgotPasswordForm = ({
  forgotPasswordEmail,
  setForgotPasswordEmail,
  handleForgotPassword,
  setShowForgotPassword,
}) => {
  const { t } = useTranslation();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="forgotPasswordEmail">
        <Form.Label>{t("login.forgot.email")}</Form.Label>
        <Form.Control
          type="email"
          value={forgotPasswordEmail}
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        className="w-100"
        onClick={handleForgotPassword}
      >
        {t("login.forgot.sendResetLinkButton")}
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
