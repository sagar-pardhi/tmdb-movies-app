import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieGridCard({ movie, onPress }: any) {
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(movie)}
      className="flex-1 m-2"
    >
      <View className="rounded-2xl overflow-hidden bg-zinc-900 h-[240px] relative">
        <Image source={{ uri: posterUrl }} className="w-full h-full" />

        {/* Rating */}
        <View className="absolute right-2 bottom-2 flex-row items-center px-2 py-1 rounded-lg bg-black/60">
          <Text className="text-xs font-bold text-yellow-400">⭐</Text>
          <Text className="ml-1 text-xs font-bold text-white">
            {movie.vote_average?.toFixed(1)}
          </Text>
        </View>
      </View>

      <Text numberOfLines={2} className="mt-2 text-sm font-semibold text-white">
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
}
