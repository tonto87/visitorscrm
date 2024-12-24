import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";

import { AppPaths } from "../../../constants/appPaths";
import Capture from "../../../modules/Capture";
import Breadcrumb from "../Breadcrumb";
import { ApplicationValidationSchema } from "../InputValidation";
import {
  useAddApplication,
  useFetchDocumentTypes,
} from "../../../hooks/useApplications";
import LoadingForm from "../../../modules/Loading/Form";
import FormField from "../FormField";
import "./style.scss";
import ItemsTable from "./ItemsTable";
import { isReception } from "../../../helpers/userHelpers";

const ApplicationsAdd = () => {
  const { t } = useTranslation();

  const { mutateAsync } = useAddApplication();
  const { data: documentTypesData, isLoading: isLoadingDocumentTypes } =
    useFetchDocumentTypes();
  const documentTypes = documentTypesData?.data;

  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const handleCapture = (imageSrc, setFieldValue) => {
    setFieldValue("photo", imageSrc);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const newFormData = {
      applications: [
        {
          ...values,
          avatar: values.photo,
          items,
          visiting_now: values.visiting_now ? 1 : 0,
          visit_time: values?.visit_time
            ? format(new Date(values.visit_time), "yyyy-MM-dd HH:mm")
            : null,
        },
      ],
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

  if (isLoadingDocumentTypes) {
    return <LoadingForm />;
  }

  const handleItemsUpdate = (data) => {
    setItems(data);
  };

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
          name: "",
          phone: "",
          doc_id: "",
          email: "",
          address: "",
          photo: "",
          doc_type: "id",
          visit_time: "",
          visiting_now: isReception() ? 1 : 0,
        }}
        validationSchema={ApplicationValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({
          setValues,
          isSubmitting,
          resetForm,
          values,
          setFieldValue,
          errors,
        }) => (
          <FormikForm className="add-form">
            {isReception() && (
              <Row className="mb-3">
                <Form.Group as={Col} xs={12} md={3} controlId="photo">
                  <Capture
                    photo={values.photo}
                    onConfirm={(imageSrc) =>
                      handleCapture(imageSrc, setFieldValue)
                    }
                    btnText={t("applications.add.photo")}
                  />
                  <ErrorMessage
                    name="photo"
                    component="div"
                    className="error"
                  />
                </Form.Group>
              </Row>
            )}
            <div className="form-wrapper">
              <FormField
                label={t("applications.add.docType")}
                name="doc_type"
                as="select"
                options={Object.entries(documentTypes)?.map(([value, key]) => ({
                  label: key,
                  value: value,
                }))}
              />
              <FormField
                label={t("applications.add.doc_id")}
                name="doc_id"
                type="text"
                className="form-control"
                withSuggestions
                suggestionSettings={{
                  docType: values.doc_type,
                  docId: values.doc_id,
                  onSelect: (item) =>
                    handleSuggestionSelect(item, values, setValues),
                }}
              />

              <FormField
                label={t("applications.add.name")}
                name="name"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("applications.add.phone")}
                name="phone"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("applications.add.email")}
                name="email"
                type="email"
                className="form-control"
              />
              <FormField
                label={t("applications.add.address")}
                name="address"
                type="text"
                className="form-control"
              />

              {!isReception() && (
                <div className="form-row  visit-time-input">
                  <FormField
                    label={t("applications.add.visitTime")}
                    name="visit_time"
                    type="datetime-local"
                    className="form-control"
                  />
                </div>
              )}
            </div>
            <ItemsTable initialItems={[]} onItemsUpdate={handleItemsUpdate} />
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
                  setItems([]);
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

export default ApplicationsAdd;
