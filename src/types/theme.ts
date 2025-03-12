export const lightTheme = {
  background: "linear-gradient(135deg, #6e8efb, #a777e3)",
  color: "#fff",
  inputBackground: "rgba(255, 255, 255, 0.2)",
  inputFocusBackground: "rgba(255, 255, 255, 0.3)",
};

export const darkTheme = {
  background: "#121212",
  color: "#fff",
  inputBackground: "rgba(255, 255, 255, 0.1)",
  inputFocusBackground: "rgba(255, 255, 255, 0.2)",
};

export type Theme = typeof lightTheme;