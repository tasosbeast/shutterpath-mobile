export const colors = {
  primary: "#FF7F4F",
  background: "#FFFFFF",
  text: "#1A1A1A",
  muted: "#888888",
  card: "#F7F7F7",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const radii = {
  sm: 6,
  md: 12,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
};

export const theme = {
  colors,
  spacing,
  radii,
  typography,
};
