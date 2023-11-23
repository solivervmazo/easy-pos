import React from "react";
import { StyleSheet, View } from "react-native";
import { AppFormInputText, ChipButton, SectionHeader } from "../../../ui";
import { commonStyles } from "../styles";
import { useRouter } from "expo-router";
import { useStackRoutes } from "../../../routes/index";
import { appColors } from "../../../themes";

const ItemDetailShortkeySection = () => {
  const router = useRouter();
  const routes = useStackRoutes();
  const _selectShortkeyColorHandle = () => {
    router.push(
      routes["items-detail"].modals["detail-select-shortkey-color"].path
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
        <AppFormInputText
          icon="Shortkeys"
          label="Item Code"
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
                    borderWidth: 1,
                    borderBlockColor: appColors.themeColor,
                    overflow: "hidden",
                    backgroundColor: appColors.darkBgSecondary,
                  }}
                />
              )}
              containerStyle={styles.inputActionButtonContainer}
              label={`Select color`}
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

export default ItemDetailShortkeySection;
