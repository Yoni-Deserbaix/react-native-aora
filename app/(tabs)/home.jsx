import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { signOut } from "../../lib/appwrite";

export default function Home() {
  const { isLoading, setIsLoggedIn, user, setUser } = useGlobalContext();
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/signIn");
  };

  console.log("hello", user?.username);
  return (
    <SafeAreaView className="bg-primary  h-full">
      {/* <Text className="text-2xl p-10 text-white">Hello</Text>
      <Text className="text-2xl p-10 text-white">{user?.username}</Text> */}
      {/* <TouchableOpacity onPress={logout}>
        <Text className="p-10 text-xl bg-green-500">logout</Text>
      </TouchableOpacity> */}
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id.toString()} // FlatList is like map in JS
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username ?? "Y2"}
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
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 4 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
}
