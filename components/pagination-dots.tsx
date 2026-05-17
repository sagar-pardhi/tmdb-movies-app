import React from "react";
import { View } from "react-native";

type Props = {
  activeIndex: number;
  total: number;
};

export default function PaginationDots({ activeIndex, total }: Props) {
  return (
    <View className="flex-row gap-3 justify-center mt-4">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`rounded-full ${
            activeIndex === index ? "w-3 h-3 bg-white" : "w-2 h-2 bg-white/30"
          }`}
        />
      ))}
    </View>
  );
}
