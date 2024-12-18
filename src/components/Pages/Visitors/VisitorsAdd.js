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
import { VisitorValidationSchema } from "../InputValidation";
import {
  useAddVisitor,
  useFetchDocumentTypes,
} from "../../../hooks/useVisitors";
import LoadingForm from "../../../modules/Loading/Form";
import FormField from "../FormField";
import "./style.scss";
import ItemsTable from "./ItemsTable";
import { isReception } from "../../../helpers/userHelpers";

const VisitorsAdd = () => {
  const { t } = useTranslation();

  const { mutateAsync } = useAddVisitor();
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
      visitors: [
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
      toast.success(t("visitors.add.success"));
      navigate(AppPaths.visitors.all);
    } catch (error) {
      toast.error(t("visitors.add.error"));
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
          { label: t("breadcrumbs.visitors"), to: AppPaths.visitors.all },
          { label: t("breadcrumbs.addVisitor") },
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
        validationSchema={VisitorValidationSchema(t)}
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
                    btnText={t("visitors.add.photo")}
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
                label={t("visitors.add.docType")}
                name="doc_type"
                as="select"
                options={Object.entries(documentTypes)?.map(([value, key]) => ({
                  label: key,
                  value: value,
                }))}
              />
              <FormField
                label={t("visitors.add.doc_id")}
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
                label={t("visitors.add.name")}
                name="name"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("visitors.add.phone")}
                name="phone"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("visitors.add.email")}
                name="email"
                type="email"
                className="form-control"
              />
              <FormField
                label={t("visitors.add.address")}
                name="address"
                type="text"
                className="form-control"
              />

              {!isReception() && (
                <div className="form-row  visit-time-input">
                  <FormField
                    label={t("visitors.add.visitTime")}
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
                  ? t("visitors.add.submitting")
                  : t("visitors.add.submit")}
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={() => {
                  resetForm();
                  setItems([]);
                }}
              >
                {t("visitors.add.reset")}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsAdd;
