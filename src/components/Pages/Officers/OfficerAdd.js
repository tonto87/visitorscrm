import { Formik, Form } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import { useAddOfficer } from "../../../hooks/useOfficers";
import Breadcrumb from "../Breadcrumb";
import FormField from "../FormField";
import { OfficerValidationSchema } from "../InputValidation";
import "./style.scss";
import { useFetchOfficers } from "@hooks/useOfficers";
import LoadingForm from "modules/Loading/Form";

const OfficerAdd = () => {
  const { data: officers, isLoading: isLoadingOfficers } = useFetchOfficers();
  const { mutateAsync } = useAddOfficer();
  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await mutateAsync(values);
      resetForm();
      toast.success(t("officer.add.success"));
    } catch (error) {
      toast.error(t("officer.add.error"));
    }
    setSubmitting(false);
  };

  if (isLoadingOfficers) {
    return <LoadingForm />;
  }

  const breadCrumbs = [
    { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
    { label: t("breadcrumbs.officers"), to: AppPaths.officers.all },
    { label: t("breadcrumbs.addOfficer") },
  ];

  return (
    <div className="user-container">
      <Breadcrumb paths={breadCrumbs} />
      <hr className="navigation-underline" />
      <Formik
        initialValues={{ name: "", surname: "", position: "" }}
        validationSchema={OfficerValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="add-form">
              <div className="form-wrapper">
                <FormField label={t("officer.add.name")} name="name" />
                <FormField label={t("officer.add.surname")} name="surname" />
                <FormField label={t("officer.add.position")} name="position" />
              </div>
              <div className="form-footer">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="btn-primary"
                >
                  {isSubmitting
                    ? t("officer.add.submitting")
                    : t("officer.add.submit")}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default OfficerAdd;
