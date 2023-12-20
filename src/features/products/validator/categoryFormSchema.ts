import * as yup from "yup";
import { RequestState } from "../../../enums";
import { requestProductCategoryDetail } from "../context/categories";
import { CategoryTransformedProps } from "../types";

const categoryFormSchema = yup.object().shape({
  categoryId: yup.string(),
  categoryName: yup
    .string()
    .required("category name is required")
    .min(3, "category name must contain at least 3 characters"),
  categoryDescription: yup.string(),
  categoryParent: yup
    .object()
    .nullable()
    .test({
      name: "categoryParent",
      message: "Category parent is invalid",
      test: async function (value: CategoryTransformedProps) {
        if (!value?.id) return true;

        const request = await requestProductCategoryDetail(undefined, {
          args: { id: value?.id },
        });

        return request?.state === RequestState.fulfilled;
      },
    }),
  categoryCode: yup.string(),
  categoryShortkeyColor: yup.string(),
});

export default categoryFormSchema;
