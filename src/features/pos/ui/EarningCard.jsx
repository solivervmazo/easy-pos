import React from "react";
import { StyleSheet, Text } from "react-native";
import { AppCard, IconButton } from "../../../ui";
import { appColors, appSizes } from "../../../themes";

const CategoryIcon = {
  cash: "Pos",
  bank: "Bank",
  ewallet: "Wallet",
};

const EarningCard = ({ account, description, amount, category }) => {
  const icon = CategoryIcon[category] || false;
  return (
    <AppCard
      title={account}
      subtitle={description}
      renderAvatar={() =>
        (icon && (
          <IconButton
            icon={"Pos"}
            size={appSizes.Icon.large}
            color={appColors.themeColorTertiary}
            containerStyle={styles.iconContainer}
          />
        )) ||
        null
      }
      avatarContainerStyle={styles.avatarContainer}
      renderAction={() => <Text style={styles.amount}>{amount}</Text>}
      actionContainerStyle={styles.actionContainer}
      titleStyle={styles.account}
    />
  );
};

const styles = StyleSheet.create({
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
  account: {
    textTransform: "uppercase",
  },
});

export default EarningCard;
