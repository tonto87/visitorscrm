import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import { Formik, Form } from "formik";
import { UserValidationSchema } from "../InputValidation";
import FormField from "../FormField";
import { useTranslation } from "react-i18next";
import { useAddUser, useFetchRoles } from "../../../hooks/useUser";
import { useFetchOffices } from "../../../hooks/useOffices";
import { useFetchDepartments } from "../../../hooks/useDepartments";
import LoadingForm from "../../../modules/Loading/Form";
import { useNavigate } from "react-router-dom";
import { generatePassword } from "../../../helpers/passwordHelper";

const AddUser = () => {
  const navigate = useNavigate();
  const { data: officeData, isLoading: isLoadingOffices } = useFetchOffices();
  const { data: departmentData, isLoading: isLoadingDepartments } =
    useFetchDepartments();
  const { data: roleData, isLoading: isLoadingRoles } = useFetchRoles();

  const departments = departmentData?.data || [];
  const offices = officeData?.data || [];
  const roles = roleData?.data || [];

  const { mutateAsync: addUser, isPending } = useAddUser();
  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      await addUser(values);
      resetForm();
      toast.success(t("user.add.success"));
      navigate(AppPaths.users.all);
    } catch (error) {
      toast.error(t("user.add.error"));
    } finally {
      setSubmitting(false);
    }
  };

  const password = generatePassword();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: password,
    password_confirmation: password,
    username: "",
    active: 1,
    department_id: "",
    office_id: "",
    role_id: "",
  };

  if (isLoadingOffices || isLoadingDepartments || isLoadingRoles) {
    return <LoadingForm />;
  }

  const handlePasswordGenerate = (setFieldValue) => {
    const newPassword = generatePassword();
    setFieldValue("password", newPassword);
    setFieldValue("password_confirmation", newPassword);
  };

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.users"), to: AppPaths.users.all },
          { label: t("breadcrumbs.addUser") },
        ]}
      />
      <hr className="navigation-underline" />
      <Formik
        initialValues={initialValues}
        validationSchema={UserValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="add-form">
            <div className="form-wrapper">
              <FormField label={t("user.add.name")} name="name" />

              <FormField label={t("user.add.username")} name="username" />

              <FormField label={t("user.add.email")} name="email" />

              <FormField label={t("user.add.phone")} name="phone" />

              <div className="pass-wrapper">
                <FormField label={t("user.add.password")} name="password" />

                <FormField
                  label={t("user.add.confirmPassword")}
                  name="password_confirmation"
                />

                <Button
                  variant="success"
                  onClick={() => handlePasswordGenerate(setFieldValue)}
                >
                  {t("user.add.generatePassword")}
                </Button>
              </div>

              <FormField
                label={t("user.add.department")}
                name="department_id"
                as="select"
                options={
                  departments.map((department) => ({
                    value: department.id,
                    label: department.name,
                  })) || []
                }
                emptyValue={t("user.add.departmentSelect")}
              />

              <FormField
                label={t("user.add.office")}
                name="office_id"
                as="select"
                options={
                  offices.map((office) => ({
                    value: office.id,
                    label: office.name,
                  })) || []
                }
                emptyValue={t("user.add.officeSelect")}
              />

              <FormField
                label={t("user.add.role")}
                name="role_id"
                as="select"
                options={
                  roles.map((role) => ({
                    value: role.id,
                    label: role.name,
                  })) || []
                }
                emptyValue={t("user.add.roleSelect")}
              />
            </div>
            <div className="form-footer">
              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                variant="primary"
                className="btn-primary w-50"
              >
                {isSubmitting || isPending
                  ? t("user.add.submitting")
                  : t("user.add.submit")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUser;
