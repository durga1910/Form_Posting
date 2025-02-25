import { useRouter } from "next/navigation";
import { loginSchema } from "../schema/loginSchema"; // Ensure this schema is defined correctly
import { useToastMessages } from "@/components/message/useToastMessages"; // Ensure this hook is defined correctly
import { setCookie } from "cookies-next";
import { APIKEY } from "@/components/constant/heroSection"; // Ensure this constant is defined correctly

export const useLogin = () => {
  const router = useRouter();
  const { Success, Warn } = useToastMessages();
  
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    console.log("Form values:", values);
    console.log("API key:", APIKEY);

    try {
      const response = await fetch(`${APIKEY}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      console.log("Full response data:", responseData); // Log the full response

      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong :(");
      }

      const userId = responseData.data._id; // Get the user ID from the response
      const token = responseData.token; // Get the token from the response

      if (token) {
        setCookie("token", token); // Set the token in cookies
        Success("Login successful! 😄");
        resetForm(); // Reset the form fields
        router.push(`/form/${userId}`); // Redirect to the user's form page
      } else {
        console.error("Token is undefined");
        Warn("Login failed: Token is undefined");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Warn(error.message || "Something went wrong :(");
    }
  };

  return {
    initialValues,
    schema: loginSchema, // Ensure this schema is defined and imported correctly
    handleSubmit,
  };
};