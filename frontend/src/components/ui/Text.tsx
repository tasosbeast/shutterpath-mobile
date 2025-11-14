import { FC } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { colors } from "../../theme";

type TextVariant = "title" | "subtitle" | "body" | "caption";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
}

export const Text: FC<TextProps> = ({ variant = "body", style, ...props }) => {
  return <RNText style={[styles[variant], style]} {...props} />;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontSize: 14,
    color: colors.muted,
  },
});
