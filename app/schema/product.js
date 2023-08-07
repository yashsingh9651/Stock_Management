import * as Yup from "yup";
export const Schema = Yup.object({
  productName: Yup.string().min(3).required("Please Enter Name"),
  quantity: Yup.number().required("Please Enter quantity"),
  price: Yup.number().required("Please Enter Price"),
});
