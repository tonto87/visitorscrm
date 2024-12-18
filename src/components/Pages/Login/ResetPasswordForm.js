import React from "react";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ResetPasswordForm = ({
  email,
  setEmail,
  token,
  setToken,
  password,
  setPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  handleResetPassword,
  setShowForgotPassword,
}) => {
  const { t } = useTranslation();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="resetEmail">
        <Form.Label>{t("login.reset.email")}</Form.Label>
        <Form.Control
          type="email"
          placeholder={t("login.reset.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="resetToken">
        <Form.Label>
          {t("login.reset.enterResetTokenAndNewPassword")}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={t("login.reset.enterResetTokenAndNewPassword")}
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="newPassword">
        <Form.Label>{t("login.reset.newPassword")}</Form.Label>
        <Form.Control
          type="password"
          placeholder={t("login.reset.newPassword")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>{t("login.reset.confirmNewPassword")}</Form.Label>
        <Form.Control
          type="password"
          placeholder={t("login.reset.confirmNewPassword")}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" className="w-100" onClick={handleResetPassword}>
        {t("login.reset.resetPasswordButton")}
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
