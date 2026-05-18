import { Movie } from "@/services/tmdbService";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

type Props = {
  movie: Movie;
  onWatchPress?: (movie: Movie) => void;
  onAddPress?: (movie: Movie) => void;
};

export default function HeroBanner({ movie, onWatchPress, onAddPress }: Props) {
  const imageUrl = `${TMDB_IMAGE_BASE}${movie.backdrop_path}`;

  return (
    <View className="overflow-hidden flex-1 rounded-3xl bg-zinc-900">
      <ImageBackground
        source={{ uri: imageUrl }}
        resizeMode="cover"
        className="flex-1 justify-end"
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={["rgba(0,0,0,0.95)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.05)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, padding: 20, justifyContent: "center" }}
        >
          {/* Badge */}
          <View className="self-start px-4 py-2 mb-3 rounded-full bg-indigo-500/25">
            <Text className="text-xs font-bold tracking-wider text-indigo-200">
              NEW RELEASE
            </Text>
          </View>

          {/* Title */}
          <Text
            numberOfLines={2}
            className="mb-3 text-4xl font-extrabold text-white"
          >
            {movie.title}
          </Text>

          {/* Description */}
          <Text
            numberOfLines={3}
            className="text-zinc-200 text-sm leading-5 w-[85%] mb-5"
          >
            {movie.overview}
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-4 items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              className="px-6 py-4 bg-white rounded-2xl"
              onPress={() => onWatchPress?.(movie)}
            >
              <Text className="text-base font-bold text-black">
                ▶ Watch Now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="justify-center items-center w-14 h-14 rounded-2xl bg-white/20"
              onPress={() => onAddPress?.(movie)}
            >
              <Text className="text-3xl font-bold text-white">＋</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
