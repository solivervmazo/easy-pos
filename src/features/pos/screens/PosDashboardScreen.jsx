import React from "react";
import { StyleSheet, View } from "react-native";
import PosQuickMode from "../shared/PosQuickMode";
import PosEarnings from "../shared/PosEarnings";
import PosSessions from "../shared/PosSessions";
import PosCheckingDevice from "../ui/PosCheckingDevice";
import { ScrollView } from "react-native-gesture-handler";
const PosDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <PosQuickMode />
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        <View style={{}}>
          <PosSessions />
        </View>
        <View style={{}}>
          <PosEarnings />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: appSpacing.screenPaddingLeft },
});

export default PosDashboardScreen;
