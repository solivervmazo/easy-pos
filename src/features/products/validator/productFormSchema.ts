import * as yup from "yup";
import { t } from "../../../locale/localization";
import { CategoryTransformedProps } from "../types"; // Import the CategoryTransformedProps type
import { requestProductCategoryDetail } from "../context/categories";
import { RequestState } from "../../../enums";

const productFormSchema = yup.object().shape({
  productId: yup
    .string()
    .required(t("id is required", "phrase"))
    .min(4, t("product id must contain at least 4 characters", "phrase")),
  productName: yup
    .string()
    .required(t("product name is required", "phrase"))
    .min(3, t("product name must contain at least 3 characters", "phrase")),
  productDescription: yup.string(),
  productCategory: yup
    .object()
    .nullable()
    .test({
      name: "categoryParent",
      message: "Category parent is invalid",
      test: async function (
        value: CategoryTransformedProps | null | undefined
      ) {
        if (!value?.id) return true;

        const request = await requestProductCategoryDetail(undefined, {
          args: { id: value?.id },
        });

        return request?.state === RequestState.fulfilled;
      },
    }),
  productBarcode: yup.string(),
  productSku: yup.string(),
});

export default productFormSchema;
