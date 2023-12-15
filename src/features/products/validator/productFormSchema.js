import * as yup from "yup";
import { t } from "../../../locale/localization";
export default productFormSchema = yup.object().shape({
  productId: yup
    .string()
    .required(t("id is required", "phrase"))
    .min(4, t("product id must contain at least 4 characters", "phrase")),
  productName: yup
    .string()
    .required(t("product name is required"))
    .min(3, t("product name must contain at least 3 characters", "phrase")),
  productDescription: yup.string(),
  productBarcode: yup.string(),
  productSku: yup.string(),
});
