import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColors, appSpacing } from "../themes";

const AppCard = ({
  title = undefined,
  renderAvatar = () => undefined,
  renderTitle = ({ title }) => undefined,
  renderAction = () => undefined,
  renderContent = () => undefined,
  containerStyle = {},
  headerContainerStyle = {},
  titleContainerStyle = {},
  avatarContainerStyle = {},
  actionContainerStyle = {},
  bodyContainerStyle = {},
  contentContainerStyle = {},
}) => {
  const _renderAvatar = () => {
    const _children = renderAvatar();
    const _avatar = (
      <View style={[styles.avatarContainer, avatarContainerStyle]}>
        {_children}
      </View>
    );
    if (_children) return _avatar;
    return null;
  };

  const _renderTitle = () => {
    const _children = renderTitle({ title });
    const _title = (
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {_children || title === undefined ? null : <Text>{title}</Text>}
      </View>
    );
    return _title;
  };

  const _renderAction = () => {
    const _children = renderAction();
    const _action = (
      <View style={[styles.actionContainer, actionContainerStyle]}>
        {_children}
      </View>
    );
    if (_children) return _action;
    return null;
  };

  const _renderContent = () => {
    const _children = renderContent();
    const _content = (
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {_children}
      </View>
    );
    if (_children) return _content;
    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {_renderAvatar()}
      <View style={[styles.bodyContainer, bodyContainerStyle]}>
        <View style={[styles.headerContainer, headerContainerStyle]}>
          {_renderTitle()}
          {_renderAction()}
        </View>
        {_renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: appColors.lightBgTertiary,
    padding: appSpacing.screenPaddingLeft,
  },
  bodyContainer: {},
  contentContainer: {},
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  titleContainer: {},
  avatarContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  actionContainer: {},
});

export default AppCard;
