import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

export default function SearchInput({ value, handleChangeText }) {
  const pathname = usePathname(); // get the current path
  const [query, setQuery] = useState("");
  return (
    <View className="border-2 flex-row border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic..."
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
      ></TextInput>
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search result across database"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query }); // update query pathname if the user already on the search page
          } else {
            router.push(`/search/${query}`); // navigate to search query
          }
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
    </View>
  );
}
