import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const genreIcons: Record<string, any> = {
  Action: "rocket-outline",
  Adventure: "compass-outline",
  Comedy: "happy-outline",
  Drama: "film-outline",
  Horror: "skull-outline",
  Romance: "heart-outline",
  "Science Fiction": "planet-outline",
  Thriller: "flash-outline",
};

export default function GenreRow({ genres }: { genres: any[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-4 px-4">
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            activeOpacity={0.8}
            className="w-[72px] h-[72px] bg-white/10 rounded-2xl items-center justify-center"
          >
            <Ionicons
              name={genreIcons[genre.name] || "grid-outline"}
              size={22}
              color="#a78bfa"
            />
            <Text
              numberOfLines={1}
              className="mt-2 text-xs font-semibold text-white"
            >
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
