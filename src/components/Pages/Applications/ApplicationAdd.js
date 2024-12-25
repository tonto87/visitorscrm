import { Formik, Form as FormikForm } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import { ApplicationValidationSchema } from "../InputValidation";
import {
  useAddApplication,
  useFetchCitizenStatuses,
} from "../../../hooks/useApplications";
import { useFetchOfficers } from "../../../hooks/useOfficers";
import FormField from "../FormField";
import "./style.scss";
import LoadingForm from "modules/Loading/Form";

const ApplicationAdd = () => {
  const { t } = useTranslation();
  const { mutateAsync } = useAddApplication();
  const { data: citizenData, isLoading: isCitizenLoading } =
    useFetchCitizenStatuses();
  const { data, isLoading } = useFetchOfficers();
  const citizenStatuses = citizenData?.data || [];
  const officers = data?.data || [];
  const navigate = useNavigate();
  console.log({ citizenStatuses });
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedAdmissionDate = format(
        new Date(values.admission_date),
        "yyyy-MM-dd HH:mm"
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

  if (isLoading || isCitizenLoading) {
    return <LoadingForm />;
  }

  const citizenOptions = Object.keys(citizenStatuses).map((key) => ({
    value: key,
    label: citizenStatuses[key],
  }));

  const officerOptions = officers.map((officer) => ({
    value: officer.id,
    label: `${officer.name} ${officer.surname}`,
  }));

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
              <FormField
                label={t("applications.add.officer_id")}
                name="officer_id"
                className="form-control"
                emptyValue={t("applications.add.selectOfficer")}
                as="select"
                options={officerOptions}
              />
              <FormField
                label={t("applications.add.task_status")}
                name="task_status"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("applications.add.citizen_status")}
                name="citizen_status"
                className="form-control"
                emptyValue={t("applications.add.selectCitizenStatus")}
                as="select"
                options={citizenOptions}
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

export default ApplicationAdd;
