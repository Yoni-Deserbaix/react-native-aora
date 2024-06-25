import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import Trending from "../../components/Trending";

export default function Home() {
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestPosts);


  const [refreshing, setRefreshing] = useState(false);

  const { setIsLoggedIn, user, setUser } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    //re call videos -> if any new videos appeard
    await refetch();
    setRefreshing(false);
  };

  // const logout = async () => {
  //   await signOut();
  //   setUser(null);
  //   setIsLoggedIn(false);

  //   router.replace("/signIn");
  // };

  console.log("hello", user?.username);
  return (
    <SafeAreaView className="bg-primary  h-full">
      {/* <TouchableOpacity onPress={logout}>
        <Text className="p-4 text-xl bg-green-500">logout</Text>
      </TouchableOpacity> */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id} // FlatList is like map in JS
        renderItem={({ item }) => (
          <VideoCard
            // video={item.video}
            title={item.title}
            thumbnail={item.thumbnail}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest videos
              </Text>
              {/* Horizontal scrolling */}
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        // Conditional rendering if there are no videos
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        // Refresh function when user scrolls up
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
