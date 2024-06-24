import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView className="bg-primary">
      {/* <Text className="text-2xl p-10 text-white">Hello</Text>
      <Text className="text-2xl p-10 text-white">{user?.username}</Text> */}
      {/* <TouchableOpacity onPress={logout}>
        <Text className="p-10 text-xl bg-green-500">logout</Text>
      </TouchableOpacity> */}
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id} // FlatList is like map in JS
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="text-2xl font-psemibold text-white">y2</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                ></Image>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
