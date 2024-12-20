import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useFetchOfficerById,
  useUpdateOfficer,
} from "../../../hooks/useOfficers";
import LoadingForm from "../../../modules/Loading/Form";
import Breadcrumb from "../Breadcrumb";

import "./style.scss";
import { AppPaths } from "../../../constants/appPaths";
import { Form, Formik } from "formik";
import { OfficerValidationSchema } from "../InputValidation";
import FormField from "../FormField";
import { Button } from "react-bootstrap";

const OfficerEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { mutateAsync: updateOfficer, isPending } = useUpdateOfficer();
  const { data, isLoading } = useFetchOfficerById(id);
  const navigate = useNavigate();

  const officer = data?.data;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateOfficer({ id, officer: values });
      toast.success(t("officer.edit.success"));
      navigate(AppPaths.officers.all);
    } catch (error) {
      toast.error(t("officer.edit.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  if (!officer) {
    return navigate(AppPaths.errors.notfound);
  }

  const breadCrumbs = [
    { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
    { label: t("breadcrumbs.officers"), to: AppPaths.officers.all },
    { label: t("breadcrumbs.editOfficer") },
  ];

  return (
    <div className="user-container">
      <Breadcrumb paths={breadCrumbs} />
      <hr className="navigation-underline" />
      <Formik
        initialValues={{
          name: officer.name,
          surname: officer.surname,
          position: officer.position,
        }}
        validationSchema={OfficerValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="add-form">
            <div className="form-wrapper">
              <FormField label={t("officer.add.name")} name="name" />
              <FormField label={t("officer.add.surname")} name="surname" />
              <FormField label={t("officer.add.position")} name="position" />
            </div>
            <div className="form-footer">
              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                variant="primary"
                className="btn-primary"
              >
                {isSubmitting || isPending
                  ? t("officer.add.submitting")
                  : t("officer.add.submit")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OfficerEdit;
