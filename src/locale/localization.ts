import * as Localization from "expo-localization";

const supportedLanguages = ["en"];
const defaultLanguage = "en";

const translations = {
  en: require("./translations/en.json"),
};

type LetterCase = "ucase" | "lcase" | "capitalize" | "phrase" | "none";

const getLanguage = (): string => {
  const deviceLanguage = Localization.locale.split("-")[0];
  return supportedLanguages.includes(deviceLanguage)
    ? deviceLanguage
    : defaultLanguage;
  // return defaultLanguage;
};

const transformize = (value: string, transform: LetterCase): string => {
  const capitalizer = (value: string): string => {
    return value.length > 1
      ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      : value.toUpperCase();
  };

  const valueToTransform = (
    typeof value === "number" ? <string>value : value
  ).toLowerCase();
  switch (transform) {
    case "ucase":
      return valueToTransform.toUpperCase();
    case "lcase":
      return valueToTransform.toLowerCase();
    case "capitalize":
      return capitalizer(valueToTransform);
    case "phrase":
      return valueToTransform
        .split(" ")
        .map((word) => capitalizer(word))
        .join(" ");
    default:
      return value;
  }
};

const pluralize = (key: string, quantity: number): string => {
  const language = getLanguage();
  const translationKey = `${key}${quantity < 1 ? "_plural" : ""}`;
  return (
    translations[language][translationKey] || translations[language][key] || key
  );
};

const t = (key: string, transform: LetterCase, quantity: number = 1) => {
  return transformize(pluralize(key, quantity), transform);
};

export { getLanguage, t };
