import HeroBanner from "@/components/hero-banner";
import MoviesRowSection from "@/components/movies-row-section";
import PaginationDots from "@/components/pagination-dots";
import PopularMoviesSkeleton from "@/components/popular-movies-skeleton";
import {
  getNowPlaying,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  Movie,
} from "@/services/tmdbService";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Index() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [popularMovies, setPopularMovies] = useState<Movie[] | null>([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      fetchNowPlayingMovies();
      fetchPopularMovies();
      fetchTopRatedMovies();
      fetchUpcomingMovies();
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

  const fetchPopularMovies = async () => {
    try {
      const data = await getPopularMovies();
      setPopularMovies(data?.results ?? []);
    } catch (error) {
      console.error("Error fetching popular movies", error);
    } finally {
      setLoadingPopular(false);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const data = await getTopRatedMovies();
      setTopRatedMovies(data?.results ?? []);
    } catch (error) {
      console.error("Error fetching top rated movies", error);
    } finally {
      setTopRatedLoading(false);
    }
  };

  const fetchUpcomingMovies = async () => {
    try {
      const data = await getUpcomingMovies();
      setUpcomingMovies(data?.results ?? []);
    } catch (error) {
      console.error("Error fetching top rated movies", error);
    } finally {
      setUpcomingLoading(false);
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
      <ScrollView className="px-5">
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-3">
          <View>
            <Text className="text-2xl text-primary-text">Hi, Alex 👋</Text>
            <Text className="text-sm text-secondary-text">
              What do you want to watch?
            </Text>
          </View>

          <View className="flex flex-row items-center gap-2">
            <Ionicons name="notifications-outline" size={25} color="#fff" />
            <Image
              source={require("../../assets/images/profile-image.png")}
              className="size-10"
            />
          </View>
        </View>

        {/* Search */}
        <TouchableOpacity className="flex flex-row items-center gap-3 p-3 px-5 mt-5 rounded-2xl bg-secondary">
          <Ionicons name="search" size={25} color="#fff" />
          <Text className="flex-1 text-sm text-primary-text">
            Search movies, shows, actors...
          </Text>

          <TouchableOpacity>
            <Ionicons name="options-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>

        <View className=" bg-[#0B0B0F] justify-center items-center mt-3">
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

        {/* Popular Movies */}
        {loadingPopular ? (
          <PopularMoviesSkeleton />
        ) : (
          <MoviesRowSection
            title="Popular Movies"
            movies={popularMovies ?? []}
            onSeeAllPress={() => console.log("See All Popular")}
            onMoviePress={(movie) => console.log("Movie Click:", movie.title)}
          />
        )}

        {/* Top Rated Movies */}
        {topRatedLoading ? (
          <PopularMoviesSkeleton />
        ) : (
          <MoviesRowSection
            title="Top Rated"
            movies={topRatedMovies}
            onSeeAllPress={() => console.log("See All Top Rated")}
            onMoviePress={(movie) =>
              console.log("Top Rated Click:", movie.title)
            }
          />
        )}

        {/* Upcoming Movies */}
        {upcomingLoading ? (
          <PopularMoviesSkeleton />
        ) : (
          <MoviesRowSection
            title="Upcoming Movies"
            movies={upcomingMovies}
            onSeeAllPress={() => console.log("See All Upcoming")}
            onMoviePress={(movie) =>
              console.log("Upcoming Click:", movie.title)
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
