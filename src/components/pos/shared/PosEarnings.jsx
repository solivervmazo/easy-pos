import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChipButton, SectionHeader, AppCard, IconButton } from "../../../ui";
import { appColors, appFonts, appSizes } from "../../../themes";
import { ScrollView } from "react-native-gesture-handler";

const PosEarnings = ({ containerStyle = {} }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <SectionHeader title={"Current Earnings"} />
      <AppCard
        title={"Cash"}
        subtitle={"Cash on register"}
        renderAvatar={() => (
          <IconButton
            icon={"Pos"}
            size={appSizes.Icon.large}
            color={appColors.themeColorTertiary}
            containerStyle={styles.iconContainer}
          />
        )}
        avatarContainerStyle={styles.avatarContainer}
        renderAction={() => <Text style={styles.amount}>3,900.50</Text>}
        actionContainerStyle={styles.actionContainer}
      />
      <AppCard
        title={"Bank"}
        subtitle={"BDO Union Bank"}
        renderAvatar={() => (
          <IconButton
            icon={"Bank"}
            size={appSizes.Icon.large}
            color={appColors.themeColorTertiary}
            containerStyle={styles.iconContainer}
          />
        )}
        avatarContainerStyle={styles.avatarContainer}
        renderAction={() => <Text style={styles.amount}>3,900.50</Text>}
        actionContainerStyle={styles.actionContainer}
      />
      <AppCard
        title={"E-Wallet"}
        subtitle={"Paypal009166956183"}
        renderAvatar={() => (
          <IconButton
            icon={"Bank"}
            size={appSizes.Icon.large}
            color={appColors.themeColorTertiary}
            containerStyle={styles.iconContainer}
          />
        )}
        avatarContainerStyle={styles.avatarContainer}
        renderAction={() => <Text style={styles.amount}>3,900.50</Text>}
        actionContainerStyle={styles.actionContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    gap: 10,
  },
  iconContainer: {
    backgroundColor: appColors.lightBackground,
    padding: 5,
  },
  amount: {
    color: appColors.lightSuccess,
    fontSize: appSizes.Text.medium,
    fontFamily: appFonts.bold,
    textTransform: "capitalize",
    ...appStyles.textLightShadow,
  },
  avatarContainer: {
    paddingEnd: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default PosEarnings;
