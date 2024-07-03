import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { deletePost, getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";

export default function Home() {
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    //re call videos -> if any new videos appeard
    await refetch();
    setRefreshing(false);
  };

  const handleSavePost = () => {
    console.log("Saved pressed");
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(videoId);
      await refetch();
      Alert.alert("Post deleted successfully");
    } catch (error) {
      Alert.alert("Could not delete post", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary  h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id} // FlatList is like map in JS
        renderItem={({ item }) => (
          <VideoCard
            videoId={item.$id}
            video={item.video}
            title={item.title}
            thumbnail={item.thumbnail}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            onSave={handleSavePost}
            onDelete={handleDeletePost}
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
            <SearchInput placeholder="Search for a video topic..." />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Trending Videos
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
