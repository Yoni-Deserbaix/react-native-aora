import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    // Stack is equivalent to children in React
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
