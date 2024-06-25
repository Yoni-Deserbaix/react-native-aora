import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";

const ZoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const ZoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  // console.log(item.thumbnail);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? ZoomIn : ZoomOut} // apply animation on current element
      duration={500} // ms
    >
      {play ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          // onPress={setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="h-12 w-12 absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default function Trending({ posts }) {
  const [activeItem, setActiveItem] = useState(posts);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
}
