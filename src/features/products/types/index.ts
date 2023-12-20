import { FormState, RequestState, SpinnerState } from "../../../enums";

export type ProductSqlRawProps = {
  id: number;
  product_id: string;
  product_name: string;
  product_description?: string;
  product_barcode?: string;
  product_sku?: string;
  product_category_id?: number;
  product_category?: {} & CategorySqlRawProps;
  product_code?: string;
  product_price?: number;
  product_shortkey_color?: string;
};

export type ProductTransformedProps = {
  id: number;
  productId: string;
  productName: string;
  productDescription?: string;
  productBarcode?: string;
  productSku?: string;
  productCategoryId?: number;
  productCode?: string;
  productCategory?: CategoryTransformedProps;
  productPrice?: number;
  productShortkeyColor?: string;
};

export type ProductScreenState = {
  screenProductSpinner: SpinnerState;
  productForm?: {
    state: FormState;
    body?: { [key: string]: any };
  };
  productTable?: {
    state: RequestState;
    data: Array<{ [key: string]: any }>;
  };
};

export type CategorySqlRawProps = {
  id: number;
  category_id: string;
  category_name: string;
  category_description?: string;
  category_code?: string;
  category_parent_id?: number;
  category_parent?: CategorySqlRawProps;
  category_shortkey_color?: string;
  category_level?: number;
  category_root_id?: string;
};

export type CategoryTransformedProps = {
  id: number;
  categoryId: string;
  categoryName: string;
  categoryDescription?: string;
  categoryCode?: string;
  categoryParentId?: number;
  categoryParent?: CategoryTransformedProps;
  categoryShortkeyColor?: string;
  categoryLevel?: number;
  categoryRootId?: string;
};

export type CategoryScreenState = {
  screenCategorySpinner: SpinnerState;
  categoryForm?: {
    state: FormState;
    body?: { [key: string]: any };
  };
  categoryTable?: {
    state: RequestState;
    data: Array<{ [key: string]: any }>;
  };
};
