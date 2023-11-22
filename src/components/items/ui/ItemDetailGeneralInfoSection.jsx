import React from "react";
import { StyleSheet, View } from "react-native";
import { SectionHeader, ChipButton, AppFormInputText } from "../../../ui";
import { appColors, appSizes } from "../../../themes";
import { commonStyles } from "../styles";

const ItemDetailGeneralInfoSection = () => {
  return (
    <View style={styles.container}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={styles.sectionHeaderContainer}
        title={"General Information"}
        titleColor={appColors.themeColor}
      />
      <View style={[styles.sectionContent]}>
        <AppFormInputText
          icon="Items"
          label="Product ID"
          enabled={true}
          inputMode="numeric"
          renderAction={() => (
            <ChipButton
              containerStyle={styles.inputActionButtonContainer}
              label={`Custom`}
            />
          )}
          required={true}
        />
        <AppFormInputText
          label="Product Name"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          required={true}
        />
        <AppFormInputText
          label="Description"
          enabled={true}
          multiline={true}
          labelContainerStyle={styles.inputLabelContainer}
        />
        <AppFormInputText
          icon="Barcode"
          label="Barcode"
          enabled={true}
          multiline={true}
          inputMode="numeric"
          renderAction={() => (
            <ChipButton
              containerStyle={styles.inputActionButtonContainer}
              label={`Camera`}
            />
          )}
        />
        <AppFormInputText
          label="SKU"
          enabled={true}
          multiline={true}
          inputMode="numeric"
          labelContainerStyle={styles.inputLabelContainer}
          renderAction={() => (
            <ChipButton
              containerStyle={styles.inputActionButtonContainer}
              label={`Camera`}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
});

export default ItemDetailGeneralInfoSection;
