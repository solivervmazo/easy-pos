import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppCard, SectionHeader, Divider } from "../../../ui";
import { appColors, appFonts, appSizes, appStyles } from "../../../themes";
import SessionButton from "../ui/SessionButton";
const DIFF = -237.33;
const PosSessions = ({ containerStyle = {} }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <SectionHeader
        title={"Session"}
        btnText={"See all"}
        renderTitle={({ TitleTextComponent, fontSize, color, title }) => (
          <View style={styles.sectionTitleContainer}>
            <TitleTextComponent
              title={title}
              fontSize={fontSize}
              color={color}
            />
          </View>
        )}
        containerStyle={{ paddingBottom: 12 }}
      />
      <View style={styles.contentContainer}>
        <AppCard
          title={"Current"}
          avatarContainerStyle={styles.avatarContainer}
          renderContent={() => (
            <View style={styles.cardContentContainer}>
              <View style={styles.actionsContainer}>
                <SessionButton
                  icon={"Calculator"}
                  chipColor={appColors.lightPrimarySecondary}
                  iconColor={appColors.lightText}
                  label={"Bill Count"}
                  labelStyle={{
                    color: appColors.lightText,
                  }}
                />
                <SessionButton
                  icon={"Pos"}
                  chipColor={appColors.lightSuccess}
                  iconColor={appColors.lightText}
                  label={"Cash"}
                  labelStyle={{
                    color: appColors.lightText,
                  }}
                />
                <View style={{ flexGrow: 1 }} />
                <SessionButton
                  chipColor={appColors.lightDanger}
                  iconColor={appColors.lightText}
                  label={"Closing"}
                  labelStyle={{
                    color: appColors.lightText,
                  }}
                />
              </View>
              <Divider horizontal={true} style={styles.divider} />
              <View style={styles.overviewContainer}>
                <Text style={styles.overviewText}>{`Difference`}</Text>
                <View style={{ flexGrow: 1 }} />
                <Text
                  style={[
                    styles.overviewText,
                    styles.overviewTextAmount,
                    {
                      color:
                        DIFF != 0
                          ? appColors.lightDanger
                          : appColors.lightSuccess,
                    },
                  ]}
                >
                  {`${DIFF > 0 ? "+" : ""}${DIFF}`}
                </Text>
              </View>
            </View>
          )}
          actionContainerStyle={styles.appCardActionContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  divider: {
    marginVertical: 10,
  },
  contentContainer: {},
  cardContentContainer: {},
  overviewContainer: {
    flexDirection: "row",
  },
  overviewText: {
    color: appColors.themeColor,
    fontSize: appSizes.Text.regular,
    fontFamily: appFonts.medium,
    textTransform: "capitalize",
    ...appStyles.textLightShadow,
  },
  overviewTextAmount: {
    fontFamily: appFonts.bold,
  },
  iconContainer: {
    backgroundColor: appColors.lightBackground,
    padding: 5,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionsContainer: {
    paddingTop: 5,
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
  },
  appCardActionContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  avatarContainer: {
    paddingEnd: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PosSessions;
