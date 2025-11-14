import { FC } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, spacing, radii } from "../../theme";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps extends Omit<PressableProps, "style"> {
  variant?: ButtonVariant;
  children: string;
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  disabled,
  ...props
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  primary: {
    backgroundColor: colors.primary,
  } as ViewStyle,
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  } as ViewStyle,
  pressed: {
    opacity: 0.7,
  } as ViewStyle,
  disabled: {
    opacity: 0.4,
  } as ViewStyle,
  text: {
    fontSize: 16,
    fontWeight: "600",
  } as TextStyle,
  primaryText: {
    color: colors.background,
  } as TextStyle,
  ghostText: {
    color: colors.primary,
  } as TextStyle,
});
