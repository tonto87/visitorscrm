import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import { useAddDepartment } from "../../../hooks/useDepartments";

import Breadcrumb from "../Breadcrumb";
import FormField from "../FormField";
import { DepartmentValidationSchema } from "../InputValidation";
import "./style.scss";
import { useFetchOffices } from "../../../hooks/useOffices";
import LoadingForm from "../../../modules/Loading/Form";
import { Button } from "react-bootstrap";

const DepartmentsAdd = () => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useAddDepartment();

  const { data, isLoading } = useFetchOffices();

  const offices = data?.data || [];

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await mutateAsync(values);
      toast.success(t("department.add.success"));
      resetForm();
    } catch (error) {
      toast.error(t("department.add.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          {
            label: t("breadcrumbs.departments"),
            to: AppPaths.departments.all,
          },
          { label: t("breadcrumbs.addDepartment") },
        ]}
      />
      <hr className="navigation-underline" />

      <Formik
        initialValues={{
          name: "",
          phone: "",
          office_id: "",
        }}
        validationSchema={DepartmentValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="add-form">
            <div className="form-wrapper">
              <FormField
                label={t("department.add.name")}
                name="name"
                className="form-control"
              />
              <FormField
                label={t("department.add.office")}
                name="office_id"
                emptyValue={t("department.add.officeSelect")}
                as="select"
                options={offices.map((office) => ({
                  value: office.id,
                  label: office.name,
                }))}
              />
              <FormField
                label={t("department.add.phone")}
                name="phone"
                type="tel"
              />
            </div>
            <div className="form-footer">
              <Button type="submit" disabled={isSubmitting || isPending}>
                {isSubmitting
                  ? t("department.add.submitting")
                  : t("department.add.submit")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DepartmentsAdd;
