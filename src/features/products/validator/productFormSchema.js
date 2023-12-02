import * as yup from "yup";
export default productFormSchema = yup.object().shape({
  productId: yup
    .string()
    .required("Id is required")
    .min(4, "Product id must contain at least 4 characters"),
  productName: yup
    .string()
    .required("Product name is required")
    .min(3, "Product name must contain at least 3 characters"),
  productDescription: yup.string(),
  productBarcode: yup.string(),
  productSku: yup.string(),
});
