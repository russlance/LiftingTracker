import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";
import fontConfig from "./Fonts";

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  roundness: 30,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4169E1",
    accent: "#f1c40f",
  },
};

export default theme;
