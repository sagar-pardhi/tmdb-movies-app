import HeroBanner from "@/components/hero-banner";
import PaginationDots from "@/components/pagination-dots";
import { getNowPlaying, Movie } from "@/services/tmdbService";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const BACKDROP_IMAGE_URL = "https://image.tmdb.org/t/p/w300/";

const { width } = Dimensions.get("window");

export default function Index() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  useFocusEffect(
    useCallback(() => {
      fetchNowPlayingMovies();
    }, []),
  );

  const fetchNowPlayingMovies = async () => {
    try {
      const data = await getNowPlaying();
      const filtered = data.results.filter((m: any) => m.backdrop_path);
      setNowPlayingMovies(filtered.slice(0, 6));
    } catch (error) {
      console.error("Error fetching movies data", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0B0B0F] justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="px-5">
        {/* Header */}
        <View className="flex flex-row justify-between items-center mt-3">
          <View>
            <Text className="text-2xl text-primary-text">Hi, Alex 👋</Text>
            <Text className="text-sm text-secondary-text">
              What do you want to watch?
            </Text>
          </View>

          <View className="flex flex-row gap-2 items-center">
            <Ionicons name="notifications-outline" size={25} color="#fff" />
            <Image
              source={require("../../assets/images/profile-image.png")}
              className="size-10"
            />
          </View>
        </View>

        {/* Search */}
        <TouchableOpacity className="flex flex-row gap-3 items-center p-3 px-5 mt-5 rounded-2xl bg-secondary">
          <Ionicons name="search" size={25} color="#fff" />
          <Text className="flex-1 text-sm text-primary-text">
            Search movies, shows, actors...
          </Text>

          <TouchableOpacity>
            <Ionicons name="options-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>

        <View className=" bg-[#0B0B0F] justify-center items-center ">
          <Carousel
            width={width * 0.92}
            height={300}
            data={nowPlayingMovies ?? []}
            autoPlay
            autoPlayInterval={3500}
            loop
            scrollAnimationDuration={900}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.95,
              parallaxScrollingOffset: 55,
            }}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <HeroBanner
                movie={item}
                onWatchPress={(movie) => console.log("Watch:", movie.title)}
                onAddPress={(movie) => console.log("Added:", movie.title)}
              />
            )}
          />

          <PaginationDots
            activeIndex={activeIndex}
            total={nowPlayingMovies?.length ?? 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
