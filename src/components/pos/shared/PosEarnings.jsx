import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SectionHeader, AppCard, IconButton } from "../../../ui";
import { appColors, appFonts, appSizes } from "../../../themes";
import EarningCard from "../ui/EarningCard";

const EARNNINGS = [
  {
    id: 1,
    account: "CASH01",
    description: "Cash on register",
    category: "cash",
    amount: {
      value: 1200.5,
      text: "1,200.50",
      currency: "USD",
    },
  },
  {
    id: 2,
    account: "BANK01",
    description: "BDO 000976877912",
    category: "bank",
    amount: {
      value: 1300.5,
      text: "1,300.50",
      currency: "USD",
    },
  },
  {
    id: 3,
    account: "GCASH01",
    description: "009166956183",
    category: "ewallet",
    amount: {
      value: 2200.5,
      text: "2,200.50",
      currency: "USD",
    },
  },
];

const PosEarnings = ({ containerStyle = {} }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <SectionHeader title={"Current Earnings"} />
      {EARNNINGS.map((earning) => (
        <EarningCard
          account={earning.account}
          description={earning.description}
          amount={earning.amount.text}
          category={earning.category}
          key={`earning-card${earning.id}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    gap: 10,
  },
});

export default PosEarnings;
