import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Button } from "react-native";
import {
  AppFormInputText,
  ChipButton,
  IconButton,
  SectionHeader,
} from "../../../ui";
import { commonStyles } from "../styles";
import { useRouter } from "expo-router";
import { useStackRoutes } from "../../../routes/index";
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
        title={"Short key"}
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
              buttonRight={() => (
                <IconButton
                  icon={"Down"}
                  color={appColors.lightText}
                  plain={true}
                  disabled={true}
                  size={appSizes.Icon.small}
                />
              )}
              containerStyle={styles.inputActionButtonContainer}
              label={`Select`}
            />
          )}
        />
        <ChipButton
          onPress={_selectShortkeyColorHandle}
          label={"Add Rule"}
          containerStyle={styles.addRuleButtonContainer}
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
