import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";

import "./style.scss";
import { ApplicationValidationSchema } from "../InputValidation";
import {
  useFetchDocumentTypes,
  useFetchApplicationById,
  useUpdateApplication,
} from "../../../hooks/useApplications";
import LoadingForm from "../../../modules/Loading/Form";
import FormField from "../FormField";
import Capture from "../../../modules/Capture";
import { format } from "date-fns";
import ItemsTable from "./ItemsTable";
import { isReception } from "@helpers/userHelpers";

const ApplicationsEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useFetchApplicationById(id);
  const [items, setItems] = useState([]);
  const application = data?.data;

  const { data: documentTypesData, isLoading: isLoadingDocumentTypes } =
    useFetchDocumentTypes();
  const documentTypes = documentTypesData?.data;

  const { mutateAsync } = useUpdateApplication();

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedVisitTime = format(
        new Date(values.visit_time),
        "yyyy-MM-dd HH:mm",
      );

      await mutateAsync({
        id: application.id,
        application: { ...values, items },
        visit_time: formattedVisitTime,
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

  const handleCapture = (imageSrc, setFieldValue) => {
    setFieldValue("avatar", imageSrc);
  };

  if (isLoading || isLoadingDocumentTypes) {
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
          { label: t("breadcrumbs.editapplication") },
        ]}
      />
      <hr className="navigation-underline" />

      <Formik
        initialValues={{
          doc_type: application.doc_type,
          doc_id: application.doc_id,
          name: application.name,
          phone: application.phone,
          email: application.email || "",
          address: application.address || "",
          visit_time: format(
            new Date(application.visit_time * 1000),
            "yyyy-MM-dd HH:mm",
          ),
          avatar: application.avatar,
        }}
        validationSchema={ApplicationValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, setValues, values, errors }) => (
          <FormikForm className="add-form">
            {isReception() && (
              <Row className="mb-3">
                <Form.Group as={Col} xs={12} md={3} controlId="photo">
                  <Capture
                    photo={values.avatar}
                    onConfirm={(imageSrc) =>
                      handleCapture(imageSrc, setFieldValue)
                    }
                    btnText={t("applications.edit.addPhoto")}
                  />
                  <ErrorMessage
                    name="avatar"
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
                label={t("applications.edit.fin")}
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
                label={t("applications.edit.name")}
                name="name"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("applications.edit.phone")}
                name="phone"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("applications.edit.email")}
                name="email"
                type="email"
                className="form-control"
              />
              <FormField
                label={t("applications.edit.address")}
                name="address"
                type="text"
                className="form-control"
              />

              {!isReception() && (
                <FormField
                  label={t("applications.edit.visitTime")}
                  name="visit_time"
                  type="datetime-local"
                  className="form-control"
                />
              )}
            </div>
            <ItemsTable
              initialItems={application?.items}
              onItemsUpdate={handleItemsUpdate}
            />
            <div className="form-footer">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("applications.edit.submitting")
                  : t("applications.edit.submit")}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default ApplicationsEdit;
