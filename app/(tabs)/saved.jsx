import React, { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";

export default function Saved() {
  const { data: posts, refetch } = useAppWrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);

  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    //re call videos -> if any new videos appeard
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id} // FlatList is like map in JS
        renderItem={({ item }) => (
          <VideoCard
            postId={item.$id}
            video={item.video}
            title={item.title}
            thumbnail={item.thumbnail}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View>
              <Text className="text-2xl font-psemibold text-white">Saved</Text>
            </View>
            <View className="my-4">
              <SearchInput placeholder="Search for your saved videos" />
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
