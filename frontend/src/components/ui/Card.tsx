import { FC, ReactNode } from "react";
import { View, StyleSheet, ViewProps, ViewStyle } from "react-native";
import { colors, spacing, radii } from "../../theme";

interface CardProps extends ViewProps {
  children: ReactNode;
}

export const Card: FC<CardProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
});
