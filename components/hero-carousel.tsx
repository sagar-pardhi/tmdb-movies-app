import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import HeroBanner from "./hero-banner";
import PaginationDots from "./pagination-dots";

const { width } = Dimensions.get("window");

export default function HeroCarousel({
  movies,
  onMoviePress,
}: {
  movies: any[];
  onMoviePress?: (movie: any) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="items-center">
      <Carousel
        width={width * 0.92}
        height={300}
        data={movies}
        loop
        autoPlay
        autoPlayInterval={3500}
        scrollAnimationDuration={900}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 50,
        }}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <HeroBanner
            movie={item}
            badgeText="TRENDING"
            onWatchPress={() => onMoviePress?.(item)}
          />
        )}
      />

      <PaginationDots activeIndex={activeIndex} total={movies.length} />
    </View>
  );
}
