import React from "react";
import { StyleSheet, View } from "react-native";
import { AppFormInput, ChipButton, SectionHeader } from "../../../ui";
import { commonStyles } from "../styles";
import { useRouter } from "expo-router";
import { useStackRoutes } from "../../../routes/index";
import { appColors, appSizes } from "../../../themes";
import Icon from "../../../ui/core/Icon";

const ProductDetailShortkeySection = ({
  formControl,
  formErrors,
  productCode,
  productShortkeyColor,
  onFormChange,
}) => {
  const router = useRouter();
  const routes = useStackRoutes();
  const _selectShortkeyColorHandle = () => {
    router.push(
      routes["products-detail"].modals["detail-select-shortkey-color"].path
    );
  };

  return (
    <View style={[styles.container]}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={styles.sectionHeaderContainer}
        title={"Shortkey"}
        titleColor={appColors.themeColor}
      />
      <View style={[styles.sectionContent]}>
        <AppFormInput
          icon="Shortkeys"
          value={productCode?.toString()}
          control={formControl}
          inputName={"productCode"}
          errors={formErrors?.productCode}
          onChange={(value) => onFormChange({ productCode: value })}
          label="Product Code"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          renderAction={() => (
            <ChipButton
              onPress={_selectShortkeyColorHandle}
              buttonRight={() => (
                <View
                  style={{
                    height: appSizes.Icon.large,
                    width: appSizes.Icon.large,
                    borderWidth: 0.5,
                    borderColor: appColors.lightBgSecondary,
                    overflow: "hidden",
                    backgroundColor:
                      productShortkeyColor || appColors.lightBgTertiary,
                  }}
                >
                  {!productShortkeyColor && (
                    <Icon.Slash
                      color={appColors.darkTextTertiary}
                      size={appSizes.Icon.large}
                    />
                  )}
                </View>
              )}
              containerStyle={styles.inputActionButtonContainer}
              label={`${
                productShortkeyColor ? productShortkeyColor : "Select color"
              }`}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  addRuleButtonContainer: { marginHorizontal: 10 },
});

export default ProductDetailShortkeySection;
