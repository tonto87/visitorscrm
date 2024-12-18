import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchOfficeById, useUpdateOffice } from "../../../hooks/useOffices";
import LoadingForm from "../../../modules/Loading/Form";
import Breadcrumb from "../Breadcrumb";

import "./style.scss";
import { AppPaths } from "../../../constants/appPaths";
import { Form, Formik } from "formik";
import { OfficeValidationSchema } from "../InputValidation";
import FormField from "../FormField";
import { Button } from "react-bootstrap";

const OfficeEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { mutateAsync: updateOffice, isPending } = useUpdateOffice();
  const { data, isLoading } = useFetchOfficeById(id);
  const navigate = useNavigate();

  const office = data?.data;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateOffice({ id, office: values });
      toast.success(t("office.edit.success"));
      navigate(AppPaths.offices.all);
    } catch (error) {
      toast.error(t("office.edit.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  if (!office) {
    return navigate(AppPaths.errors.notfound);
  }

  const breadCrumbs = [
    { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
    { label: t("breadcrumbs.offices"), to: AppPaths.offices.all },
    { label: t("breadcrumbs.editOffice") },
  ];

  return (
    <div className="user-container">
      <Breadcrumb paths={breadCrumbs} />
      <hr className="navigation-underline" />
      <Formik
        initialValues={{
          name: office.name,
          address: office.address,
          phone: office.phone,
        }}
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

export default OfficeEdit;
