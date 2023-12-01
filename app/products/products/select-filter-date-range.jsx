import { StyleSheet, View } from "react-native";

import { AppModal, AppDaterangePicker } from "../../../src/ui";

const SelectFilterDateRange = () => {
  return (
    <AppModal
      renderContent={() => (
        <View style={[styles.modalContent]}>
          <AppDaterangePicker />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  modalContent: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default SelectFilterDateRange;
