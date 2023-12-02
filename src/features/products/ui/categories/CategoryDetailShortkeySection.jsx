import React from "react";
import { StyleSheet, View } from "react-native";
import { AppFormInput, ChipButton, SectionHeader } from "../../../../ui";
import { commonStyles } from "../../styles";
import { useRouter } from "expo-router";
import { useStackRoutes } from "../../../../routes/index";
import { appColors, appSizes } from "../../../../themes";
import Icon from "../../../../ui/core/Icon";

const CategoryDetailShortkeySection = ({
  formControl,
  formErrors,
  categoryCode,
  categoryShortkeyColor,
  onFormChange,
}) => {
  const router = useRouter();
  const routes = useStackRoutes();
  const _selectShortkeyColorHandle = () => {
    router.push(
      routes["categories-detail"].modals["detail-select-shortkey-color"].path
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
          value={categoryCode?.toString()}
          control={formControl}
          name={"categoryCode"}
          errors={formErrors?.categoryCode}
          onChange={(value) => onFormChange({ categoryCode: value })}
          label="Category Code"
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
                      categoryShortkeyColor || appColors.lightBgTertiary,
                  }}
                >
                  {!categoryShortkeyColor && (
                    <Icon.Slash
                      color={appColors.darkTextTertiary}
                      size={appSizes.Icon.large}
                    />
                  )}
                </View>
              )}
              containerStyle={styles.inputActionButtonContainer}
              label={`${
                categoryShortkeyColor ? categoryShortkeyColor : "Select color"
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

export default CategoryDetailShortkeySection;
