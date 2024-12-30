import * as yup from "yup";

// Registration Schema
const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .transform((email) => email.toLowerCase()), // Automatically convert email to lowercase
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    )
    .max(20, "Password must be at most 20 characters long"), // Optional: Max length for password
  role: yup
    .string()
    .oneOf(["admin", "manager", "editor"], "Invalid role") // Normalized to lowercase roles
    .required("Role is required"),
});

// Login Schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .transform((email) => email.toLowerCase()), // Convert email to lowercase
  password: yup.string().required("Password is required"),
});

export { registerSchema, loginSchema };
