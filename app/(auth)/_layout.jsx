import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="signIn" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <StatusBar style="light" backgroundColor="#161622" />
    </Stack>
  );
}
