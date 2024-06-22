import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function index() {
  return (
    <View style={styles.container}>
      <Text>Aora!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
