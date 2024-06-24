import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

export default function SearchInput({ value, handleChangeText }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 flex-row border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder="Search for a video topic..."
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
      ></TextInput>
      <TouchableOpacity>
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
    </View>
  );
}
