import * as yup from "yup";
export default categoryFormSchema = yup.object().shape({
  categoryId: yup.string(),
  categoryName: yup
    .string()
    .required("category name is required")
    .min(3, "category name must contain at least 3 characters"),
  categoryDescription: yup.string(),
  categoryParentId: yup.string(),
  categoryCode: yup.string(),
  categoryShortkeyColor: yup.string(),
});
