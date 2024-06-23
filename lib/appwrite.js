import { Client } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwriteConfig.io/v1",
  platform: "com.y2.aora",
  projectId: "6677eca30027af061854",
  databaseId: "6677ee5b00377d4f6fc6",
  userCollectionId: "6677ee9f002f9a36169a",
  videoCollectionId: "6677eec60028b5e74635",
  storageId: "6677f0850034421ed648",
};

// React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);
