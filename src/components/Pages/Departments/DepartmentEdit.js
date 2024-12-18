import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import { useFetchOffices } from "../../../hooks/useOffices";
import {
  useFetchDepartmentById,
  useUpdateDepartment,
} from "../../../hooks/useDepartments";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import FormField from "../FormField";
import { DepartmentValidationSchema } from "../InputValidation";
import { useTranslation } from "react-i18next";
import LoadingForm from "../../../modules/Loading/Form";
import { AppPaths } from "../../../constants/appPaths";

const DepartmentEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: officesData, isLoading: isOfficesLoading } = useFetchOffices();
  const { data, isLoading } = useFetchDepartmentById(id);
  const { mutateAsync, isPending } = useUpdateDepartment();
  const department = data?.data;
  const offices = officesData?.data;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await mutateAsync({ id, department: values });
      toast.success(t("department.edit.success"));
      navigate(AppPaths.departments.all);
    } catch (error) {
      toast.error(t("department.edit.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (isOfficesLoading || isLoading) {
    return <LoadingForm />;
  }

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: "Dashboard", to: AppPaths.dashboard },
          { label: "Departments", to: AppPaths.departments.all },
          { label: "Department - Edit" },
        ]}
      />

      <hr className="navigation-underline" />
      <Formik
        initialValues={{
          name: department?.name || "",
          phone: department?.phone || "",
          office_id: department?.office_id || "",
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
                label={t("department.add.phone")}
                name="phone"
                type="tel"
              />
              <FormField
                label={t("department.add.office")}
                name="office_id"
                as="select"
                options={offices.map((office) => ({
                  value: office.id,
                  label: office.name,
                }))}
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

export default DepartmentEdit;
