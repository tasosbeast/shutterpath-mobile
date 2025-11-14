import { FC } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";
import { Text } from "../components/ui/Text";

export const DailyChallengeScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="subtitle">Daily Challenge Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
