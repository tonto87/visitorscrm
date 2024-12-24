import { Formik, Form as FormikForm } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import { ApplicationValidationSchema } from "../InputValidation";
import { useAddApplication } from "../../../hooks/useApplications";
import { useFetchOfficers } from "../../../hooks/useOfficers";
import FormField from "../FormField";
import "./style.scss";

const ApplicationAdd = () => {
  const { t } = useTranslation();
  const { mutateAsync } = useAddApplication();
  const { data, isLoading } = useFetchOfficers();
  const officers = data?.data || [];
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedAdmissionDate = format(
        new Date(values.admission_date),
        "yyyy-MM-dd HH:mm",
      );

      const newFormData = {
        officer_id: values.officer_id,
        citizen_status: values.citizen_status || "",
        doc_id: values.doc_id,
        description: values.description,
        admission_date: formattedAdmissionDate,
        tasks: values.tasks,
        task_status: values.task_status,
        citizen: {
          name: values.name,
          surname: values.surname,
          patronymic: values.patronymic,
        },
      };

      await mutateAsync(newFormData);
      toast.success(t("applications.add.success"));
      navigate(AppPaths.applications.all);
    } catch (error) {
      toast.error(t("applications.add.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          {
            label: t("breadcrumbs.applications"),
            to: AppPaths.applications.all,
          },
          { label: t("breadcrumbs.addApplication") },
        ]}
      />
      <hr className="navigation-underline" />
      <Formik
        initialValues={{
          doc_id: "",
          name: "",
          surname: "",
          patronymic: "",
          officer_id: "",
          admission_date: "",
          description: "",
          tasks: "",
          task_status: "",
          citizen_status: "",
        }}
        validationSchema={ApplicationValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <FormikForm className="add-form">
            <div className="form-wrapper">
              <FormField
                label={t("applications.add.doc_id")}
                name="doc_id"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("applications.add.citizen.name")}
                name="name"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("applications.add.citizen.surname")}
                name="surname"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("applications.add.citizen.patronymic")}
                name="patronymic"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("applications.add.admission_date")}
                name="admission_date"
                type="datetime-local"
                className="form-control"
              />
              <FormField
                label={t("applications.add.tasks")}
                name="tasks"
                type="text"
                className="form-control"
              />
              <div className="form-group">
                <label htmlFor="officer_id">
                  {t("applications.add.officer_id")}
                </label>
                <select
                  id="officer_id"
                  name="officer_id"
                  className="form-control"
                >
                  <option value="" disabled>
                    {t("applications.add.selectOfficer")}
                  </option>
                  {isLoading ? (
                    <option>{t("loading")}</option>
                  ) : (
                    officers.map((officer) => (
                      <option key={officer.id} value={officer.id}>
                        {officer.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <FormField
                label={t("applications.add.task_status")}
                name="task_status"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("applications.add.citizen_status")}
                name="citizen_status"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("applications.add.description")}
                name="description"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-footer">
              <Button variant="success" type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("applications.add.submitting")
                  : t("applications.add.submit")}
              </Button>
              <Button variant="danger" type="button" onClick={resetForm}>
                {t("applications.add.reset")}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default ApplicationAdd;
