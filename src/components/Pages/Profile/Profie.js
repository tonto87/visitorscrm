import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import FormField from "../FormField";
import { useTranslation } from "react-i18next";
import { resetPassword } from "../../../api/resetPasswordApi";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import "./profile.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const { email, name, phone } = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  const initialValues = {
    password: "",
    password_confirmation: "",
  };

  const handleResetPassword = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const { password, password_confirmation } = values;
      await resetPassword(email, token, password, password_confirmation);
      toast.success(t("user.profile.passwordUpdated"));
      navigate(AppPaths.dashboard);
    } catch (error) {
      toast.error(error.message || t("user.profile.updateError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="profile-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.editUser") },
        ]}
      />
      <hr className="navigation-underline" />
      <div className="profile-header">
        <h1>{t("user.profile.title")}</h1>
        <div className="profile-info">
          <p>
            {t("user.profile.name")}: {name}
          </p>
          <p>
            {t("user.profile.email")}: {email}
          </p>
          <p>
            {t("user.profile.phone")}: {phone}
          </p>
        </div>
      </div>
      <hr />
      <Formik
        className="profile-formik-form"
        initialValues={initialValues}
        onSubmit={handleResetPassword}
      >
        {({ isSubmitting }) => (
          <Form className="profile-form">
            <div className="form-wrapper">
              <div className="profile-password-input-container">
                <FormField
                  label={t("user.profile.newPassword")}
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                />
                <div
                  className="profile-password-toggle-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="profile-password-input-container">
                <FormField
                  label={t("user.profile.confirmPassword")}
                  name="password_confirmation"
                  type={passwordConfirmVisible ? "text" : "password"}
                />
                <div
                  className="profile-password-toggle-icon"
                  onClick={() =>
                    setPasswordConfirmVisible(!passwordConfirmVisible)
                  }
                >
                  {passwordConfirmVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="form-footer">
              <Button
                type="submit"
                variant="primary"
                className="btn-primary w-50"
              >
                {isSubmitting
                  ? t("user.profile.submitting")
                  : t("user.profile.updatePassword")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
