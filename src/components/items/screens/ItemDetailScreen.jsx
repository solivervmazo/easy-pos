import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppSpinner, ChipButton, Spacer } from "../../../ui/";
import { appColors, appSizes, appSpacing } from "../../../themes";
import { ScrollView } from "react-native-gesture-handler";
import ItemDetailScreenHeader from "../ui/ItemDetailScreenHeader";
import ItemDetailGeneralInfoSection from "../ui/ItemDetailGeneralInfoSection";
import ItemDetailCategoryAndVariationSection from "../ui/ItemDetailCategoryAndVariationSection";
import ItemDetailPricingAndDiscountSection from "../ui/ItemDetailPricingAndDiscountSection";
import ItemDetailShortkeySection from "../ui/ItemDetailShortkeySection";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  insertProduct,
  restartForm,
  fetchProductDetail,
} from "../../../store/slices/products/productSlice";
import { replaceSlugs, useStackRoutes } from "../../../routes";

const ItemDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const routes = useStackRoutes();

  const dispatch = useDispatch();
  const {
    formLoading,
    formSubmitted,
    formState,
    form: {
      productId,
      productName,
      productDescription,
      productBarcode,
      productSku,
    },
  } = useSelector((state) => state.items);

  const [_productId, setProductId] = useState(productId);
  const [_productName, setProductName] = useState(productName);
  const [_productDescription, setProductDescription] =
    useState(productDescription);
  const [_productBarcode, setProductBarcode] = useState(productBarcode);
  const [_productSku, setProductSku] = useState(productSku);

  const _saveFormHandle = () => {
    dispatch(
      insertProduct({
        // product_id: _productId,
        product_name: _productName,
        product_description: _productDescription,
        product_barcode: _productBarcode,
        product_sku: _productSku,
      })
    );
    // _navigateDetailHandle();
  };

  const _navigateDetailHandle = (id, params = {}) => {
    const _routePath = replaceSlugs(routes["items-detail"], [productId]);
    console.log("PATH:", _routePath);
    router.replace(_routePath);
  };

  useEffect(() => {
    console.log(formSubmitted, id, id == "undefined");
    if (id != "undefined") {
      console.log("BLAHH:", productId);
      dispatch(fetchProductDetail({ args: { product_id: id } }));
      setProductName(productId);
      setProductId(productName);
      setProductDescription(productDescription);
      setProductBarcode(productBarcode);
      setProductSku(productSku);
    }
    if (formSubmitted === 3) {
      dispatch(restartForm());
      _navigateDetailHandle();
    }
  }, [
    dispatch,
    formSubmitted,
    productId,
    productId,
    productName,
    productDescription,
    productBarcode,
    productSku,
  ]);

  return (
    <>
      {formLoading && <AppSpinner />}
      <ItemDetailScreenHeader />
      <View style={[styles.container]}>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          {/* General information */}
          <ItemDetailGeneralInfoSection
            productId={_productId}
            productName={_productName}
            productDescription={_productDescription}
            productBarcode={_productBarcode}
            productSku={_productSku}
            onProductIdChange={setProductId}
            onProductNameChange={setProductName}
            onProductDescriptionChange={setProductDescription}
            onProductBarcodeChange={setProductBarcode}
            onProductSkuChange={setProductSku}
          />
          {/* Category and variations */}
          <Spacer size={25} horizontal={false} />
          <ItemDetailCategoryAndVariationSection />
          {/* Pricing and discounts */}
          <Spacer size={25} horizontal={false} />
          <ItemDetailPricingAndDiscountSection />
          {/* Shortkeys */}
          <Spacer size={25} horizontal={false} />
          <ItemDetailShortkeySection />
        </ScrollView>
        <View>
          <ChipButton
            onPress={_saveFormHandle}
            containerStyle={styles.saveButtonContainer}
            labelStyle={styles.saveButtonLabel}
            label={"Save"}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: appSpacing.screenPaddingLeft,
    paddingVertical: 10,
  },
  saveButtonContainer: {
    backgroundColor: appColors.lightSuccess,
    paddingVertical: 15,
  },
  saveButtonLabel: {
    fontSize: appSizes.Text.regular,
  },
});

export default ItemDetailScreen;
