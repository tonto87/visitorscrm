import { Formik, Form as FormikForm } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";

import { UserValidationSchema } from "../InputValidation";
import LoadingForm from "../../../modules/Loading/Form";
import {
  useFetchRoles,
  useFetchUserById,
  useUpdateUser,
} from "../../../hooks/useUser";
import FormField from "../FormField";
import { useFetchOffices } from "../../../hooks/useOffices";
import { useFetchDepartments } from "../../../hooks/useDepartments";
import { generatePassword } from "../../../helpers/passwordHelper";

const UsersEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useFetchUserById(id);
  const { data: officeData, isLoading: isLoadingOffices } = useFetchOffices();
  const { data: departmentData, isLoading: isLoadingDepartments } =
    useFetchDepartments();
  const { data: rolesData, isLoading: isLoadingRoles } = useFetchRoles();
  const offices = officeData?.data || [];
  const departments = departmentData?.data || [];
  const roles = rolesData?.data || [];
  const user = data?.data;
  const { mutateAsync, isPending } = useUpdateUser();

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await mutateAsync({
        id: user.id,
        user: { ...values, active: values.active ? 1 : 0 },
      });
      setSubmitting(false);
      toast.success(t("user.edit.success"));
      navigate(AppPaths.users.all);
    } catch (error) {
      toast.error(t("user.edit.error"));
    }
  };

  if (isLoading || isLoadingOffices || isLoadingDepartments || isLoadingRoles) {
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
          { label: t("breadcrumbs.editUser") },
        ]}
      />
      <hr className="navigation-underline" />

      <Formik
        initialValues={{
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          password: "",
          password_confirmation: "",
          role_id: user.role_id,
          office_id: user.office_id,
          department_id: user.department_id,
          active: user.active,
        }}
        validationSchema={UserValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <FormikForm className="add-form">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={t("user.edit.active")}
              checked={values.active}
              onChange={(e) => setFieldValue("active", e.target.checked)}
            />
            <div className="form-wrapper">
              <FormField label={t("user.edit.name")} name="name" />
              <FormField label={t("user.edit.username")} name="username" />
              <FormField label={t("user.edit.email")} name="email" />
              <FormField label={t("user.edit.phone")} name="phone" />
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
                label={t("user.edit.role")}
                name="role_id"
                as="select"
                options={
                  roles.map((role) => ({
                    value: role.id,
                    label: role.name,
                  })) || []
                }
              />

              <FormField
                label={t("user.edit.department")}
                name="department_id"
                as="select"
                options={
                  departments.map((department) => ({
                    value: department.id,
                    label: department.name,
                  })) || []
                }
              />
              <div className="form-row">
                <FormField
                  label={t("user.edit.office")}
                  name="office_id"
                  as="select"
                  options={
                    offices.map((office) => ({
                      value: office.id,
                      label: office.name,
                    })) || []
                  }
                />
              </div>
            </div>
            <div className="form-footer">
              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                variant="primary"
                className="btn-primary w-50"
              >
                {isSubmitting || isPending
                  ? t("user.edit.submitting")
                  : t("user.edit.submit")}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default UsersEdit;
