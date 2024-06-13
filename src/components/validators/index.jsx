import * as yup from "yup";

export const loginSchema = yup
  .object({
    id: yup
      .string()
      .required("This field is required.")
      .matches(/^\d+$/, "ID must contain only numbers.")
      .test("len", "ID must be exactly 11 or 16 digits.", (value) => {
        return value && (value.length === 11 || value.length === 16);
      })
      .typeError("This field is required."),
    password: yup
      .string()
      .required("This field is required.")
      .min(8, "Password must be at least 8 characters"),
  })
  .required();
