import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppPaths } from "../../../constants/appPaths";
import { editVisitor } from "../../../store/reducers/visitorReducer";
import Breadcrumb from "../Breadcrumb";

import "./style.scss";
import { VisitorValidationSchema } from "../InputValidation";
import {
  useFetchDocumentTypes,
  useFetchVisitorById,
  useUpdateVisitor,
} from "../../../hooks/useVisitors";
import LoadingForm from "../../../modules/Loading/Form";
import FormField from "../FormField";
import Capture from "../../../modules/Capture";
import { format } from "date-fns";
import ItemsTable from "./ItemsTable";
import { isReception } from "@helpers/userHelpers";

const VisitorsEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useFetchVisitorById(id);
  const [items, setItems] = useState([]);
  const visitor = data?.data;

  const { data: documentTypesData, isLoading: isLoadingDocumentTypes } =
    useFetchDocumentTypes();
  const documentTypes = documentTypesData?.data;

  const { mutateAsync } = useUpdateVisitor();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedVisitTime = format(
        new Date(values.visit_time),
        "yyyy-MM-dd HH:mm",
      );

      await mutateAsync({
        id: visitor.id,
        visitor: { ...values, items },
        visit_time: formattedVisitTime,
      });
      dispatch(editVisitor({ id: visitor.id, data: values }));
      setSubmitting(false);
      toast.success(t("visitors.edit.success"));
      navigate(AppPaths.visitors.view.replace(":id", visitor.id));
    } catch (error) {
      toast.error(t("visitors.edit.error"));
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
          { label: t("breadcrumbs.visitors"), to: AppPaths.visitors.all },
          { label: t("breadcrumbs.editVisitor") },
        ]}
      />
      <hr className="navigation-underline" />

      <Formik
        initialValues={{
          doc_type: visitor.doc_type,
          doc_id: visitor.doc_id,
          name: visitor.name,
          phone: visitor.phone,
          email: visitor.email || "",
          address: visitor.address || "",
          visit_time: format(
            new Date(visitor.visit_time * 1000),
            "yyyy-MM-dd HH:mm",
          ),
          avatar: visitor.avatar,
        }}
        validationSchema={VisitorValidationSchema(t)}
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
                    btnText={t("visitors.edit.addPhoto")}
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
                label={t("visitors.add.docType")}
                name="doc_type"
                as="select"
                options={Object.entries(documentTypes)?.map(([value, key]) => ({
                  label: key,
                  value: value,
                }))}
              />
              <FormField
                label={t("visitors.edit.fin")}
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
                label={t("visitors.edit.name")}
                name="name"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("visitors.edit.phone")}
                name="phone"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("visitors.edit.email")}
                name="email"
                type="email"
                className="form-control"
              />
              <FormField
                label={t("visitors.edit.address")}
                name="address"
                type="text"
                className="form-control"
              />

              {!isReception() && (
                <FormField
                  label={t("visitors.edit.visitTime")}
                  name="visit_time"
                  type="datetime-local"
                  className="form-control"
                />
              )}
            </div>
            <ItemsTable
              initialItems={visitor?.items}
              onItemsUpdate={handleItemsUpdate}
            />
            <div className="form-footer">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("visitors.edit.submitting")
                  : t("visitors.edit.submit")}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsEdit;
