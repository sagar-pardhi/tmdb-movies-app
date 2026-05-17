import { Movie } from "@/services/tmdbService";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

type Props = {
  movies: Movie[];
  onSeeAllPress?: () => void;
  onMoviePress?: (movie: Movie) => void;
};

export default function PopularMoviesSection({
  movies,
  onSeeAllPress,
  onMoviePress,
}: Props) {
  return (
    <View className="mt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-xl font-bold text-white">Popular Movies</Text>

        <TouchableOpacity onPress={onSeeAllPress}>
          <Text className="text-sm font-semibold text-indigo-400">See All</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View className="w-4" />}
        renderItem={({ item }) => {
          const posterUrl = `${TMDB_IMAGE_BASE}${item.poster_path}`;

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onMoviePress?.(item)}
              className="w-[120px]"
            >
              {/* Poster */}
              <View className="relative rounded-2xl overflow-hidden bg-zinc-900 h-[170px]">
                <Image
                  source={{ uri: posterUrl }}
                  resizeMode="cover"
                  className="w-full h-full"
                />

                {/* Rating Overlay */}
                <View className="absolute right-2 bottom-2 flex-row items-center px-2 py-1 rounded-lg bg-black/60">
                  <Text className="text-xs font-bold text-yellow-400">⭐</Text>
                  <Text className="ml-1 text-xs font-bold text-white">
                    {item.vote_average.toFixed(1)}
                  </Text>
                </View>
              </View>

              {/* Title */}
              <Text
                numberOfLines={2}
                className="mt-2 text-sm font-semibold text-white"
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
