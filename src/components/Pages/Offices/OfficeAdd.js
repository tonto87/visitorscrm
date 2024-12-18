import { Formik, Form } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import { useAddOffice } from "../../../hooks/useOffices";
import Breadcrumb from "../Breadcrumb";
import FormField from "../FormField";
import { OfficeValidationSchema } from "../InputValidation";
import "./style.scss";

const OfficeAdd = () => {
  const { data: offices } = useSelector((state) => state.offices);
  const { mutateAsync, isPending } = useAddOffice();
  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const uniqueId = Date.now().toString();
    const newOffice = { ...values, id: uniqueId };

    const existingOffice = offices.find(
      (office) => office.name === newOffice.name,
    );

    if (existingOffice) {
      setSubmitting(false);
      return toast.error(t("office.add.officeExists"));
    }

    try {
      await mutateAsync(newOffice);
      resetForm();
      toast.success(t("office.add.success"));
    } catch (error) {
      toast.error("office.add.error");
    }

    setSubmitting(false);
  };

  const breadCrumbs = [
    { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
    { label: t("breadcrumbs.offices"), to: AppPaths.offices.all },
    { label: t("breadcrumbs.addOffice") },
  ];

  return (
    <div className="user-container">
      <Breadcrumb paths={breadCrumbs} />
      <hr className="navigation-underline" />
      <Formik
        initialValues={{ name: "", address: "", phone: "" }}
        validationSchema={OfficeValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="add-form">
            <div className="form-wrapper">
              <FormField label={t("office.add.name")} name="name" />
              <FormField label={t("office.add.address")} name="address" />
              <FormField
                label={t("office.add.phone")}
                name="phone"
                type="tel"
              />
            </div>
            <div className="form-footer">
              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                variant="primary"
                className="btn-primary"
              >
                {isSubmitting || isPending
                  ? t("office.add.submitting")
                  : t("office.add.submit")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OfficeAdd;
