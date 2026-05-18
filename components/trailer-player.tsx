import React from "react";
import { Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function TrailerPlayer({ youtubeKey }: { youtubeKey: string }) {
  return (
    <View className="mt-6">
      <Text className="mb-3 text-lg font-bold text-white">Trailer</Text>

      <View className="overflow-hidden rounded-2xl bg-zinc-900">
        <YoutubePlayer height={220} play={false} videoId={youtubeKey} />
      </View>
    </View>
  );
}
