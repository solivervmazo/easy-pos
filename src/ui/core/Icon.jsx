import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { appSizes } from "../../themes";

const Icons = (icon, props = {}) => Icon[icon](props);

class _Icon {
  constructor(props) {
    const {
      size = appSizes.Icon.regular,
      color = "black",
      fill = false,
      style = {},
    } = props;
    this.size = size;
    this.color = color;
    this.fill = fill;
    this.style = style;
  }

  antdesign(defaultIcon, filledIcon) {
    return (
      <AntDesign
        name={!this.fill ? defaultIcon : filledIcon || defaultIcon}
        size={this.size}
        color={this.color}
        style={this.style}
      />
    );
  }

  feather(defaultIcon, filledIcon) {
    return (
      <Feather
        name={!this.fill ? defaultIcon : filledIcon || defaultIcon}
        size={this.size}
        color={this.color}
        style={this.style}
      />
    );
  }

  fontawesome5(defaultIcon, filledIcon) {
    return (
      <FontAwesome5
        name={!this.fill ? defaultIcon : filledIcon || defaultIcon}
        size={this.size}
        color={this.color}
        style={this.style}
      />
    );
  }

  ionicons(defaultIcon, filledIcon) {
    return (
      <Ionicons
        name={!this.fill ? defaultIcon : filledIcon || defaultIcon}
        size={this.size}
        color={this.color}
        style={this.style}
      />
    );
  }

  materialicons(defaultIcon, filledIcon) {
    return (
      <MaterialIcons
        name={!this.fill ? defaultIcon : filledIcon || defaultIcon}
        size={this.size}
        color={this.color}
        style={this.style}
      />
    );
  }

  materialicons2(defaultIcon, filledIcon) {
    return (
      <MaterialCommunityIcons
        name={!this.fill ? defaultIcon : filledIcon || defaultIcon}
        size={this.size}
        color={this.color}
        style={this.style}
      />
    );
  }
}

const Back = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("arrow-back-outline", "arrow-back-sharp");
};

const Bed = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("bed-outline", "bed-sharp");
};

const Car = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("car-outline", "car-sharp");
};

const Dial = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("phone-dial", "phone-dial-outline");
};

const Gps = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("gps-fixed", "gps-fixed");
};

const Heart = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("md-heart-outline", "md-heart-sharp");
};

const Home = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("home", "home");
};

const Items = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("inbox", "inbox");
};

const Location = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("location-outline", "location-sharp");
};

const MenuDot = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("dots-vertical", "dots-vertical");
};

const OpenLink = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("open-outline", "open");
};

const Pet = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("pets", "pets");
};

const Place = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("map-outline", "map-sharp");
};

const Pool = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("pool", "pool");
};

const PosManualMode = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("magnify-scan", "magnify-scan");
};

const PosScanMode = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("line-scan", "line-scan");
};

const PosShortkeysMode = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("scan1", "scan1");
};

const Qr = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("qr-code-outline", "qr-code");
};

const Receipt = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("receipt-outline", "receipt-sharp");
};

const ReceiptReturns = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("book-cancel-outline", "book-cancel");
};

const Restaurant = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("restaurant-outline", "restaurant-sharp");
};

const Search = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("search-outline", "search-sharp");
};

const Share = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("ios-share-social-outline", "ios-share-social-sharp");
};

const Shortkeys = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("view-grid-plus-outline", "view-grid-plus");
};
const Star = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("md-star-outline", "md-star-sharp");
};

const Tags = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("tagso", "tags");
};

const Tap = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("gesture-tap", "gesture-tap");
};

const Tv = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("tv-outline", "tv-sharp");
};

const Unit = (props) => {
  const icon = new _Icon(props);
  return icon.feather("sliders", "sliders");
};

const Warehouse = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("storefront-outline", "storefront");
};

const Wifi = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("wifi", "wifi");
};

const Icon = {
  Icons, //
  Back, //
  Bed, //
  Dial, //
  Car, //
  Heart, //
  Home,
  Items,
  Gps, //
  Location, //
  MenuDot, //
  OpenLink,
  Pet, //
  Place, //
  Pool, //
  PosManualMode,
  PosScanMode,
  PosShortkeysMode,
  Qr,
  Receipt,
  ReceiptReturns,
  Restaurant, //
  Shortkeys,
  Search, //
  Share, //
  Star, //
  Tags,
  Tap,
  Tv, //
  Unit,
  Warehouse, //
  Wifi, //
};

export default Icon;
