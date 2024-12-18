import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/authApi";
import { forgotPassword } from "../../../api/forgotPasswordApi";
import { resetPassword } from "../../../api/resetPasswordApi";
import { toast } from "react-toastify";
import { AppPaths } from "../../../constants/appPaths";
import { useTranslation } from "react-i18next";

import { FaArrowLeft } from "react-icons/fa";

import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

import "./style.scss";
import { Button } from "react-bootstrap";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [token, setToken] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(AppPaths.dashboard);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t("login.toast.pleaseEnterEmailAndPassword"));
      return;
    }
    setLoading(true);
    try {
      await login(email, password, dispatch);

      navigate(AppPaths.dashboard);
    } catch (err) {
      toast.error(t("login.toast.invalidEmailOrPassword"));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      toast.error(t("login.toast.pleaseEnterEmailAddress"));
      return;
    }
    try {
      await forgotPassword(forgotPasswordEmail);
      toast.success(t("login.toast.pleaseCheckYourEmail"));
      setForgotPasswordEmail("");
      setShowForgotPassword(false);
      toast.info(t("login.toast.checkYourEmailForResetLink"));
      setToken("123456");
      setEmail(forgotPasswordEmail);
      setShowForgotPassword(true);
    } catch (error) {
      toast.error(error.message || t("login.toast.invalidEmailOrPassword"));
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !token || !password || !passwordConfirmation) {
      toast.error(t("login.toast.pleaseEnterEmailAndPassword"));
      return;
    }
    if (password !== passwordConfirmation) {
      toast.error(t("login.toast.passwordsDoNotMatch"));
      return;
    }
    setLoading(true);

    try {
      await resetPassword(email, token, password, passwordConfirmation);
      toast.success(t("login.toast.passwordResetSuccess"));
      setShowForgotPassword(false);
      setToken("");
    } catch (error) {
      toast.error(error.message || t("login.toast.invalidEmailOrPassword"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url('/assets/images/auth-bg.jpg')` }}
    >
      <div className="login-card">
        <div className="login-form">
          {(showForgotPassword || token) && (
            <Button
              variant="link"
              className="back-button"
              onClick={() => setShowForgotPassword(false)}
            >
              <FaArrowLeft />
              {t("login.backToLogin")}
            </Button>
          )}
          <div className="form-content">
            <div className="form-header">
              <div className="form-lang">{/* <LangSwitcher /> */}</div>
              <h4 className="form-subtitle">
                {showForgotPassword && !token
                  ? t("login.forgot.forgotPassword")
                  : showForgotPassword && token
                    ? t("login.reset.title")
                    : t("login.welcome")}
              </h4>
              <h1 className="form-title">
                {showForgotPassword && !token
                  ? t("login.forgot.enterEmailForReset")
                  : showForgotPassword && token
                    ? t("login.reset.enterResetTokenAndNewPassword")
                    : t("login.loginWithEmail")}
              </h1>
            </div>
            <div className="form-body">
              {!showForgotPassword ? (
                <LoginForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  passwordVisible={passwordVisible}
                  setPasswordVisible={setPasswordVisible}
                  loading={loading}
                  handleSubmit={handleLogin}
                  keepLoggedIn={keepLoggedIn}
                  setKeepLoggedIn={setKeepLoggedIn}
                  setShowForgotPassword={setShowForgotPassword}
                />
              ) : token ? (
                <ResetPasswordForm
                  email={email}
                  setEmail={setEmail}
                  token={token}
                  setToken={setToken}
                  password={password}
                  setPassword={setPassword}
                  passwordConfirmation={passwordConfirmation}
                  setPasswordConfirmation={setPasswordConfirmation}
                  handleResetPassword={handleResetPassword}
                  setShowForgotPassword={setShowForgotPassword}
                />
              ) : (
                <ForgotPasswordForm
                  forgotPasswordEmail={forgotPasswordEmail}
                  setForgotPasswordEmail={setForgotPasswordEmail}
                  handleForgotPassword={handleForgotPassword}
                  setShowForgotPassword={setShowForgotPassword}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className="login-image"
          style={{
            backgroundImage: `url('/assets/images/login.png')`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
