import { Slot } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="default" />
      <Slot />
    </>
  );
}
