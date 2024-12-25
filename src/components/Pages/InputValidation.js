import * as Yup from "yup";

export const OfficeValidationSchema = (t) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .min(3, t("validations.minLength.officeName"))
      .required(t("validations.required.officeName")),
    address: Yup.string()
      .trim()
      .min(5, t("validations.minLength.address"))
      .required(t("validations.required.address")),
    phone: Yup.string()
      .matches(/^\d+$/, t("validations.pattern.phone"))
      .required(t("validations.required.phone")),
  });

export const DepartmentValidationSchema = (t) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .min(3, t("validations.minLength.departmentName"))
      .required(t("validations.required.departmentName")),
    phone: Yup.string()
      .matches(/^\d+$/, t("validations.pattern.phone"))
      .required(t("validations.required.phone")),
    office_id: Yup.string().required(t("validations.required.officeSelection")),
  });

export const ApplicationValidationSchema = (t) =>
  Yup.object({
    doc_id: Yup.string()
      .min(3, t("validations.minLength.doc_id"))
      .required(t("validations.required.doc_id")),

    name: Yup.string()
      .min(3, t("validations.minLength.name"))
      .required(t("validations.required.name")),

    surname: Yup.string()
      .min(3, t("validations.minLength.surname"))
      .required(t("validations.required.surname")),

    patronymic: Yup.string()
      .min(3, t("validations.minLength.patronymic"))
      .optional(),

    admission_date: Yup.date()
      .required(t("validations.required.admission_date"))
      .nullable(),

    officer_id: Yup.string().required(
      t("validations.required.officerSelection"),
    ),
    description: Yup.string().optional(),
    tasks: Yup.string().optional(),
    task_status: Yup.string().optional(),
    citizen_status: Yup.string().optional(),
  });

export const UserValidationSchema = (t) =>
  Yup.object({
    name: Yup.string()
      .min(3, t("validations.minLength.name"))
      .required(t("validations.required.name")),
    username: Yup.string()
      .min(3, t("validations.minLength.username"))
      .required(t("validations.required.username")),
    phone: Yup.string()
      .matches(/^\d+$/, t("validations.pattern.phone"))
      .required(t("validations.required.phone")),
    email: Yup.string()
      .email(t("validations.pattern.email"))
      .required(t("validations.required.email")),
    role_id: Yup.string().required(t("validations.required.role")),
    office_id: Yup.string().required(t("validations.required.office")),
    department_id: Yup.string().required(t("validations.required.department")),
    password: Yup.string().min(8, t("validations.minLength.password")),
    // .required(t("validations.required.password")),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      t("validations.match.password"),
    ),
    // .required(t("validations.required.passwordConfirmation")),
    active: Yup.boolean(),
  });

export const OfficerValidationSchema = (t) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .min(3, t("validations.minLength.officerName"))
      .required(t("validations.required.officerName")),
    surname: Yup.string()
      .trim()
      .min(3, t("validations.minLength.officerSurname"))
      .required(t("validations.required.officerSurname")),
    position: Yup.string()
      .trim()
      .min(3, t("validations.minLength.officerPosition"))
      .required(t("validations.required.officerPosition")),
  });
