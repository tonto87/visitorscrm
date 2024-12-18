import { Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import UserSuggestions from "../../modules/UserSuggestions";

const FormField = ({
  label = "",
  placeholder = "",
  name,
  type = "text",
  as = "input",
  options = [],
  emptyValue,
  fieldProps = {},
  withSuggestions = false,
  suggestionSettings = {},
}) => {
  const [show, setShow] = useState(false);

  const handleBlur = () => {
    setTimeout(() => {
      setShow(false);
    }, 200);
  };

  return (
    <div className="form-group">
      {withSuggestions && (
        <UserSuggestions {...suggestionSettings} show={show} />
      )}

      <label htmlFor={name}>{label}</label>
      {as === "select" ? (
        <Field
          {...fieldProps}
          as="select"
          id={name}
          name={name}
          className="form-control"
        >
          {emptyValue && (
            <option value="" disabled>
              {emptyValue.toLowerCase()}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value || option.name}>
              {option.label || option.name}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          onFocus={() => setShow(true)}
          onBlur={handleBlur}
          {...fieldProps}
          type={type}
          id={name}
          name={name}
          placeholder={`${placeholder.toLowerCase()}`}
          className="form-control"
        />
      )}
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default FormField;
