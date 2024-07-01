import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { deletePost } from "../lib/appwrite";

export default function VideoCard({
  postId,
  title,
  thumbnail,
  video,
  username,
  avatar,
  creator,
}) {
  const [play, setPlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = () => {
    setIsVisible(!isVisible);
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      Alert.alert("Post deleted successfuly");
    } catch (error) {
      Alert.alert("Could not delete post", error.message);
    }

    console.log("Delete pressed");
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <View className="relative">
            <TouchableOpacity onPress={handleSelect}>
              <Image
                source={icons.menu}
                className="w-5 h-5"
                resizeMode="contain"
              />
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
                  onPress={handleDelete}
                  className="flex-row items-center w-full"
                >
                  <Image
                    source={icons.trash}
                    className="w-[20px] h-[20px] -ml-0.5 mr-1.5"
                    resizeMode="contain"
                  />
                  <Text className="text-lg text-white font-pmedium">
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3 -z-10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 flex relative justify-center items-center -z-10"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
