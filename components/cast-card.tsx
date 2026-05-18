import React from "react";
import { Image, Text, View } from "react-native";

const TMDB_PROFILE_BASE = "https://image.tmdb.org/t/p/w185";

export default function CastCard({ cast }: any) {
  const imageUrl = cast.profile_path
    ? `${TMDB_PROFILE_BASE}${cast.profile_path}`
    : "https://via.placeholder.com/150x150?text=No+Image";

  return (
    <View className="mr-4 items-center w-[90px]">
      <Image
        source={{ uri: imageUrl }}
        className="w-[80px] h-[80px] rounded-full bg-zinc-800"
      />
      <Text numberOfLines={1} className="mt-2 text-xs font-semibold text-white">
        {cast.name}
      </Text>
      <Text numberOfLines={1} className="text-zinc-400 text-[10px]">
        {cast.character}
      </Text>
    </View>
  );
}
