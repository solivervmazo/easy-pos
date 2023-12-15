import React from "react";
import { View, Text } from "react-native";

type SectionProps = {
  title?: string;
};

type MyComponentProps = {
  children?: React.ReactNode;
};

const createComponentFactory = () => {
  const MyComponent: React.FC<MyComponentProps> & {
    Section: React.FC<SectionProps>;
  } = ({ children }) => <View>{children}</View>;

  const Section: React.FC<SectionProps & { children?: React.ReactNode }> = ({
    title,
    children,
  }) => (
    <View>
      {title && <Text>{title}</Text>}
      {children}
    </View>
  );

  MyComponent.Section = Section;

  return MyComponent;
};

export default createComponentFactory;
