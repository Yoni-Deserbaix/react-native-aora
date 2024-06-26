import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function query() {
  const { query } = useLocalSearchParams(); // Hook to get params // like useSearchParams in next.js
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-3xl text-white">{query}</Text>
    </SafeAreaView>
  );
}
