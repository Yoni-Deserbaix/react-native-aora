import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <Link href="/profile" style={{ color: "blue" }}>
        Go to profile
      </Link>
    </View>
  );
}
