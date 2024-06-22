import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FieldForm from "../../components/FieldForm";
import { images } from "../../constants";

export default function signIn() {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full justify-center px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          ></Image>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FieldForm
            title="Email"
            value={form.email}
            handleTextChange={(e) => setform({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-adress"
          />
          <FieldForm
            title="Password"
            value={form.password}
            handleTextChange={(e) => setform({ ...form, password: e })}
            otherStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
