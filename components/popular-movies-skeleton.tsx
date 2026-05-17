import React from "react";
import { View } from "react-native";

export default function PopularMoviesSkeleton() {
  return (
    <View className="mt-6">
      {/* Header Skeleton */}
      <View className="flex-row justify-between items-center px-4 mb-4">
        <View className="w-40 h-5 rounded-lg bg-white/10" />
        <View className="w-16 h-4 rounded-lg bg-white/10" />
      </View>

      {/* Movie Card Skeleton List */}
      <View className="flex-row px-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} className="mr-4">
            {/* Poster Skeleton */}
            <View className="w-[120px] h-[170px] bg-white/10 rounded-2xl" />

            {/* Title Skeleton */}
            <View className="h-4 w-[100px] bg-white/10 rounded-lg mt-3" />
            <View className="h-4 w-[70px] bg-white/10 rounded-lg mt-2" />
          </View>
        ))}
      </View>
    </View>
  );
}
