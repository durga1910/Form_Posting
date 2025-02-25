import * as Yup from "yup";

// Regular expression for password validation
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// Regular expression for email validation (only allows Gmail and Yahoo domains)
const emailRules = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;

// Define the validation schema using Yup
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email!") // Checks if the email is valid
    .matches(emailRules, { message: "Not valid: Only Gmail and Yahoo emails are allowed." }) // Matches the email regex
    .required("Email Required!"), // Required field message
  password: Yup.string()
    .matches(passwordRules, { message: "Please create a stronger password!" }) // Matches the password regex
    .required("Password Required!"), // Required field message
});