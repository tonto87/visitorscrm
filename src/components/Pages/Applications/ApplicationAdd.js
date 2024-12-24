import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";

import { AppPaths } from "../../../constants/appPaths";
// import Capture from "../../../modules/Capture";
import Breadcrumb from "../Breadcrumb";
import { ApplicationValidationSchema } from "../InputValidation";
import { useAddApplication } from "../../../hooks/useApplications";
import { useDeleteOfficer, useFetchOfficers } from "../../../hooks/useOfficers";

// import LoadingForm from "../../../modules/Loading/Form";
import FormField from "../FormField";
import "./style.scss";
// import ItemsTable from "./ItemsTable";
// import { isReception } from "../../../helpers/userHelpers";

const ApplicationAdd = () => {
  const { t } = useTranslation();
  const { mutateAsync } = useAddApplication();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // const handleCapture = (imageSrc, setFieldValue) => {
  //   setFieldValue("photo", imageSrc);
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
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

    try {
      await mutateAsync(newFormData);
      setSubmitting(false);
      toast.success(t("applications.add.success"));
      navigate(AppPaths.applications.all);
    } catch (error) {
      toast.error(t("applications.add.error"));
    }
  };

  // const handleItemsUpdate = (data) => {
  //   setItems(data);
  // };

  const handleSuggestionSelect = (item, values, setValues) => {
    setValues({
      ...values,
      name: item.name || "",
      phone: item.phone || "",
      email: item.email || "",
      address: item.address || "",
    });
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
        {({ setValues, isSubmitting, resetForm, values, setFieldValue }) => (
          <FormikForm className="add-form">
            <div className="form-wrapper">
              {/* Document ID */}
              <FormField
                label={t("applications.add.doc_id")}
                name="doc_id"
                type="text"
                className="form-control"
              />
              {/* First Name */}
              <FormField
                label={t("applications.add.citizen.name")}
                name="name"
                type="text"
                className="form-control"
              />
              {/* Surname */}
              <FormField
                label={t("applications.add.citizen.surname")}
                name="surname"
                type="text"
                className="form-control"
              />
              {/* Patronymic */}
              <FormField
                label={t("applications.add.citizen.patronymic")}
                name="patronymic"
                type="text"
                className="form-control"
              />
              {/* Admission Date */}
              <FormField
                label={t("applications.add.admission_date")}
                name="admission_date"
                type="datetime-local"
                className="form-control"
              />
              {/* Tasks */}
              <FormField
                label={t("applications.add.tasks")}
                name="tasks"
                type="text"
                className="form-control"
              />
              {/* Officer id */}
              <FormField
                label={t("applications.add.officer_id")}
                name="officer_id"
                type="text"
                className="form-control"
              />
              {/* Task Status */}
              <FormField
                label={t("applications.add.task_status")}
                name="task_status"
                type="text"
                className="form-control"
              />
              {/* Citizen Status */}
              <FormField
                label={t("applications.add.citizen_status")}
                name="citizen_status"
                type="text"
                className="form-control"
              />
              {/* Description */}
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
              <Button
                variant="danger"
                type="button"
                onClick={() => {
                  resetForm();
                }}
              >
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
