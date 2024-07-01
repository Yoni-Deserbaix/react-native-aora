import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

export default function DropdownMenu() {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View className="relative">
      <TouchableOpacity onPress={handleSelect}>
        <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
      {isVisible && (
        <View className="border border-[#232533] px-4 rounded-xl absolute top-10 right-0 h-[85px] w-[130px] z-50 gap-2 bg-[#1E1E2D] justify-start items-center">
          <TouchableOpacity
            onPress={() => console.log("Save pressed")}
            className="flex-row items-center w-full"
          >
            <Image
              source={icons.bookmark}
              className="w-4 h-4 mr-2"
              resizeMode="contain"
            />
            <Text className="text-lg text-white font-pmedium">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Delete pressed")}
            className="flex-row items-center w-full"
          >
            <Image
              source={icons.trash}
              className="w-[20px] h-[20px] -ml-0.5 mr-1.5"
              resizeMode="contain"
            />
            <Text className="text-lg text-white font-pmedium">Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
