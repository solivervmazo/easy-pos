import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
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

  octicons(defaultIcon, filledIcon) {
    return (
      <Octicons
        name={!this.fill ? defaultIcon : filledIcon || defaultIcon}
        size={this.size}
        color={this.color}
        style={this.style}
      />
    );
  }
}

export const Add = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("plus", "plus");
};

export const Back = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("arrow-back-outline", "arrow-back-sharp");
};

export const Bank = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("bank", "bank");
};

export const Barcode = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("barcode", "barcode");
};

export const Bed = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("bed-outline", "bed-sharp");
};

export const Calculator = (props) => {
  const icon = new _Icon(props);
  return icon.fontawesome5("calculator", "calculator");
};

export const Calendar = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("calendar", "calendar");
};

export const Car = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("car-outline", "car-sharp");
};

export const Category = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("shapes-outline", "shapes-sharp");
};

export const ChevLeft = (props) => {
  const icon = new _Icon(props);
  return icon.octicons("chevron-left", "chevron-left");
};

export const ChevRight = (props) => {
  const icon = new _Icon(props);
  return icon.octicons("chevron-right", "chevron-right");
};

export const Close = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("close", "close");
};

export const CursorText = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("cursor-text", "cursor-text");
};

export const Copy = (props) => {
  const icon = new _Icon(props);
  return icon.feather("copy", "copy");
};

export const Dial = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("phone-dial", "phone-dial-outline");
};

export const Down = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("down", "down");
};

export const Drawer = (props) => {
  const icon = new _Icon(props);
  return icon.octicons("three-bars", "three-bars");
};

export const Filters = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("filter", "filter");
};

export const Forward = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("arrow-forward-outline", "arrow-forward-sharp");
};

export const Gps = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("gps-fixed", "gps-fixed");
};

export const Heart = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("md-heart-outline", "md-heart-sharp");
};

export const Home = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("home", "home");
};

export const Items = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("inbox", "inbox");
};

export const Info = (props) => {
  const icon = new _Icon(props);
  return icon.fontawesome5("info", "info");
};

export const Keyboard = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("keyboard", "keyboard");
};

export const KeyboardOff = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("keyboard-off", "keyboard-off");
};

export const Location = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("location-outline", "location-sharp");
};

export const MenuDot = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("dots-vertical", "dots-vertical");
};

export const Minus = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("minus", "minus");
};

export const OpenLink = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("open-outline", "open");
};

export const Pencil = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("pencil", "pencil");
};

export const Pet = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("pets", "pets");
};

export const Place = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("map-outline", "map-sharp");
};

export const PlayNext = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("caretright", "caretright");
};

export const PlayPrev = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("caretleft", "caretleft");
};

export const PlayEnd = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("stepforward", "stepforward");
};

export const PlayStart = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("stepbackward", "stepbackward");
};

export const Pool = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("pool", "pool");
};

export const Pos = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("point-of-sale", "point-of-sale");
};

export const PosManualMode = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("magnify-scan", "magnify-scan");
};

export const PosScanMode = (props) => {
  const icon = new _Icon(props);
  return icon.feather("camera", "camera");
};

export const PosShortkeysMode = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("scan1", "scan1");
};

export const Qr = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("qr-code-outline", "qr-code");
};

export const Receipt = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("receipt-outline", "receipt-sharp");
};

export const ReceiptReturns = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("book-cancel-outline", "book-cancel");
};

export const Refresh = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("refresh", "refresh");
};

export const Restaurant = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("restaurant-outline", "restaurant-sharp");
};

export const Save = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons("save", "save");
};

export const Search = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("search-outline", "search-sharp");
};

export const Share = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("ios-share-social-outline", "ios-share-social-sharp");
};

export const Slash = (props) => {
  const icon = new _Icon(props);
  return icon.feather("slash", "slash");
};

export const Shortkeys = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("view-grid-plus-outline", "view-grid-plus");
};
export const Star = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("md-star-outline", "md-star-sharp");
};

export const Tag = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("tago", "tag");
};

export const Tags = (props) => {
  const icon = new _Icon(props);
  return icon.antdesign("tagso", "tags");
};

export const Tap = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("gesture-tap", "gesture-tap");
};

export const Tv = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("tv-outline", "tv-sharp");
};

export const Unit = (props) => {
  const icon = new _Icon(props);
  return icon.feather("sliders", "sliders");
};

export const Variant = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("brush-variant", "brush-variant");
};

export const Wallet = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("wallet-outline", "wallet");
};

export const Warehouse = (props) => {
  const icon = new _Icon(props);
  return icon.materialicons2("storefront-outline", "storefront");
};

export const Wifi = (props) => {
  const icon = new _Icon(props);
  return icon.ionicons("wifi", "wifi");
};

const Icon = {
  Icons, // dynamic icon
  Add,
  Back, //
  Bank,
  Barcode,
  Bed, //
  Dial, //
  Down,
  Drawer,
  Car, //
  Calculator,
  Calendar,
  Category,
  ChevLeft,
  ChevRight,
  Close,
  CursorText,
  Copy,
  Forward,
  Heart, //
  Home,
  Info,
  Items,
  Keyboard,
  KeyboardOff,
  Filters,
  Gps, //
  Location, //
  MenuDot, //
  Minus,
  OpenLink,
  Pencil,
  Pet, //
  Place, //
  PlayNext,
  PlayPrev,
  PlayStart,
  PlayEnd,
  Pool, //
  Pos,
  PosManualMode,
  PosScanMode,
  PosShortkeysMode,
  Qr,
  Receipt,
  ReceiptReturns,
  Refresh,
  Restaurant, //
  Save,
  Slash,
  Shortkeys,
  Search, //
  Share, //
  Star, //
  Tag,
  Tags,
  Tap,
  Tv, //
  Unit,
  Variant,
  Wallet,
  Warehouse, //
  Wifi, //
};

export default Icon;
