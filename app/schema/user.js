import * as Yup from "yup";
export const Schema = Yup.object({
  username: Yup.string().min(3).required("Please Enter userName"),
  email: Yup.string().email().required("Please Enter email"),
  password: Yup.string().required("Please Enter Password"),
  cPassword: Yup.string().required("Please Enter Confirm Password"),
});