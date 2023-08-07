import * as Yup from "yup";
export const Schema = Yup.object({
  username: Yup.string().min(3).required("Please Enter userName"),
  email: Yup.string().email().required("Please Enter email"),
  password: Yup.string().min(8).required("Please Enter Password of 8 Characters"),
  cPassword: Yup.string().min(8).required("Please Enter Confirm Password"),
});