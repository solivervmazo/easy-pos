import * as yup from "yup";
import { RequestState } from "../../../enums";
import { requestProductCategoryDetail } from "../context/categories";
export default categoryFormSchema = yup.object().shape({
  categoryId: yup.string(),
  categoryName: yup
    .string()
    .required("category name is required")
    .min(3, "category name must contain at least 3 characters"),
  categoryDescription: yup.string(),
  categoryParent: yup
    .object()
    .nullable()
    .test(async (value, ctx) => {
      if (!value?.id) return true;
      let request = await requestProductCategoryDetail(false, {
        args: { id: value?.id },
      });
      if (request?.state === RequestState.fulfilled) return true;

      return ctx.createError({ message: "Category parent is invalid" });
    }),
  categoryCode: yup.string(),
  categoryShortkeyColor: yup.string(),
});
