import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColors, appSpacing, appStyles } from "../themes";

const AppCard = ({
  title = undefined,
  subtitle = undefined,
  renderAvatar = () => undefined,
  renderTitle = ({ title, titleStyle }) => undefined,
  renderSubtitle = ({ subtitle }) => undefined,
  renderAction = () => undefined,
  renderContent = () => undefined,
  containerStyle = {},
  titleStyle = {},
  titleSubtitleContainerStyle = {},
  subtitleStyle = {},
  headerContainerStyle = {},
  titleContainerStyle = {},
  subtitleContainerStyle = {},
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
    const _children = renderTitle({
      title,
      titleStyle: { ...styles.title, ...titleStyle },
    });
    const _title = (
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {_children && title === undefined
          ? null
          : _children || (
              <Text style={[styles.title, titleStyle]}>{title}</Text>
            )}
      </View>
    );
    return _title;
  };

  const _renderSubtitle = () => {
    const _children = renderSubtitle({ subtitle });
    const _subtitle = (
      <View style={[styles.subtitleContainer, subtitleContainerStyle]}>
        {_children || subtitle === undefined ? null : (
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
        )}
      </View>
    );
    return _subtitle;
  };

  const _renderTitleSubtitle = () => {
    const _titleSubtitle = (
      <View
        style={[styles.titleSubtitleContainer, titleSubtitleContainerStyle]}
      >
        {_renderTitle()}
        {_renderSubtitle()}
      </View>
    );
    return _titleSubtitle;
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
          {_renderTitleSubtitle()}
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
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
  },
  contentContainer: {},
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  titleContainer: {},
  titleSubtitleContainer: {
    justifyContent: "center",
  },
  title: {
    color: appColors.themeColor,
    fontSize: appSizes.Text.regular,
    fontFamily: appFonts.medium,
    textTransform: "capitalize",
    ...appStyles.textLightShadow,
  },
  subtitle: {
    color: appColors.lightTextTertiary,
    fontSize: appSizes.Text.small,
    fontFamily: appFonts.regular,
    textTransform: "capitalize",
    ...appStyles.textLightShadow,
  },
  subtitleContainer: {},
  avatarContainer: {
    alignItems: "center",
  },
  actionContainer: {},
});

export default AppCard;
