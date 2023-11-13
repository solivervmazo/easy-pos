import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Divider from "./core/Divider";
import ChipButton from "./ChipButton";
import { appColors, appSizes, appSpacing } from "../themes";
import { useRouter } from "expo-router";

const AppModal = ({
  renderContent = () => {},
  renderFooter = ({ onCancel, onConfirm }) => undefined,
  cancelLabel = "Dismiss",
  confirmLabel = "Confirm",
  onCancel = undefined,
  onConfirm = () => {},
  containerStyle = {},
  dividerStyle = {},
  footerStyle = {},
  actionContainerStyle = {},
  actionButtonStyle = {},
  actionButtonLabelStyle = {},
  statusBarTheme = "light",
}) => {
  const router = useRouter();
  const handleDismiss = () => {
    router.canGoBack() && router.back();
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {renderContent()}
      {renderFooter({
        onCancel: onCancel === undefined ? handleDismiss : onCancel,
        onConfirm,
      }) || (
        <View style={[styles.footer, footerStyle]}>
          <Divider horizontal={true} style={[styles.divider, dividerStyle]} />
          <View style={[styles.actionContainer, actionContainerStyle]}>
            <ChipButton
              label={cancelLabel}
              flat={true}
              labelStyle={[styles.actionButtonLabel, actionButtonLabelStyle]}
              containerStyle={[styles.actionButton, actionButtonStyle]}
              onPress={onCancel === undefined ? handleDismiss : onCancel}
            />
            <ChipButton
              label={confirmLabel}
              flat={true}
              labelStyle={[styles.actionButtonLabel, actionButtonLabelStyle]}
              containerStyle={[styles.actionButton, actionButtonStyle]}
              onPress={onConfirm}
            />
          </View>
        </View>
      )}
      <StatusBar style={statusBarTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between" },
  footer: {},
  divider: {
    backgroundColor: appColors.lightBgTertiary,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: appSpacing.screenPaddingLeft,
  },
  actionButtonLabel: {
    color: appColors.themeColor,
    fontSize: appSizes.Text.regular,
  },
  actionButton: {
    borderRadius: 5,
  },
});

export default AppModal;
