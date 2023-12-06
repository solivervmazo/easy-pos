import * as yup from "yup";
export default productVariationFormSchema = yup.object().shape({
  productVariationId: yup.string(),
  productVariationName: yup
    .string()
    .required("Product variation name is required")
    .min(3, "Product variation name must contain at least 3 characters"),
  productVariationDescription: yup.string(),
});
