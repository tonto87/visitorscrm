import { Formik, Form as FormikForm } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";

import "./style.scss";
import { ApplicationValidationSchema } from "../InputValidation";
import {
  useFetchApplicationById,
  useUpdateApplication,
} from "../../../hooks/useApplications";
import LoadingForm from "../../../modules/Loading/Form";
import FormField from "../FormField";
import { format } from "date-fns";
import { useFetchOfficers } from "@hooks/useOfficers";

const ApplicationsEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useFetchApplicationById(id);
  const application = data?.data;
  const { data: officerData, isLoading: isOfficersLoading } =
    useFetchOfficers();
  const officers = officerData?.data || [];

  const { mutateAsync } = useUpdateApplication();

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedVisitTime = format(
        new Date(values.admission_date),
        "yyyy-MM-dd HH:mm"
      );

      await mutateAsync({
        id: application.id,
        application: values,
        admission_date: formattedVisitTime,
      });
      setSubmitting(false);
      toast.success(t("applications.edit.success"));
      navigate(AppPaths.applications.view.replace(":id", application.id));
    } catch (error) {
      toast.error(t("applications.edit.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  // const handleSuggestionSelect = (item, values, setValues) => {
  //   setValues({
  //     ...values,
  //     name: item.name || "",
  //     phone: item.phone || "",
  //     email: item.email || "",
  //     address: item.address || "",
  //   });
  // };
  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          {
            label: t("breadcrumbs.applications"),
            to: AppPaths.applications.all,
          },
          { label: t("breadcrumbs.editapplication") },
        ]}
      />
      <hr className="navigation-underline" />

      <Formik
        initialValues={{
          doc_id: application.doc_id,
          name: application.name,
          surname: application.surname,
          patronymic: application.patronymic,
          officer_id: application.officer_id,
          admission_date: format(
            new Date(application.admission_date * 1000),
            "yyyy-MM-dd HH:mm"
          ),
          description: application.description,
          tasks: application.tasks || "",
          task_status: application.task_status || "",
          citizen_status: application.citizen_status || "",
        }}
        validationSchema={ApplicationValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm, errors, values, setFieldValue }) => (
          <FormikForm className="add-form">
            {console.log({ errors, values })}
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
                <Form.Select
                  aria-label="Default select example"
                  id="officer_id"
                  name="officer_id"
                  className="form-control"
                  value={values.officer_id}
                  onChange={(e) => {
                    setFieldValue("officer_id", e.target.value);
                  }}
                >
                  <option value="" disabled>
                    {t("applications.add.selectOfficer")}
                  </option>
                  {isOfficersLoading ? (
                    <option>{t("loading")}</option>
                  ) : (
                    officers.map((officer) => (
                      <option key={officer.id} value={officer.id}>
                        {officer.name}
                      </option>
                    ))
                  )}
                </Form.Select>
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
              <div className="form-row">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>{t("applications.add.description")}</Form.Label>
                  <Form.Control
                    value={values.description}
                    onChange={(e) => {
                      setFieldValue("description", e.target.value);
                    }}
                    name="description"
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
              </div>
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

export default ApplicationsEdit;
