import { FC } from "react";
import { StyleSheet, ScrollView, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../theme";
import { Text } from "../components/ui/Text";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useDailyPrompt } from "../hooks/useDailyPrompt";

export const DailyPromptScreen: FC = () => {
  const { prompt, loading, error, refetch } = useDailyPrompt();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text variant="title" style={styles.screenTitle}>
          Daily Prompt
        </Text>

        {loading && (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text variant="body" style={styles.loadingText}>
              Loading today's prompt...
            </Text>
          </View>
        )}

        {error && !loading && (
          <View style={styles.centerContent}>
            <Text variant="body" style={styles.errorText}>
              {error}
            </Text>
            <Button variant="primary" onPress={refetch}>
              Retry
            </Button>
          </View>
        )}

        {prompt && !loading && !error && (
          <View style={styles.promptContent}>
            <Card style={styles.promptCard}>
              <Text variant="subtitle" style={styles.promptTitle}>
                {prompt.title}
              </Text>
              <Text variant="body" style={styles.promptDescription}>
                {prompt.description}
              </Text>
            </Card>

            {prompt.referenceImageUrl ? (
              <Card style={styles.imageCard}>
                <Text variant="caption" style={styles.imagePlaceholder}>
                  Reference Image
                </Text>
              </Card>
            ) : (
              <Card style={styles.imagePlaceholder}>
                <Text variant="caption">No reference image available</Text>
              </Card>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  screenTitle: {
    marginBottom: spacing.xl,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxl,
    gap: spacing.lg,
  },
  loadingText: {
    color: colors.muted,
    marginTop: spacing.sm,
  },
  errorText: {
    color: colors.muted,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  promptContent: {
    gap: spacing.lg,
  },
  promptCard: {
    gap: spacing.md,
  },
  promptTitle: {
    marginBottom: spacing.sm,
  },
  promptDescription: {
    lineHeight: 24,
  },
  imageCard: {
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    minHeight: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
  },
});
