import HeroBanner from "@/components/hero-banner";
import MoviesModal from "@/components/movies-modal";
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
import { router, useFocusEffect } from "expo-router";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFetcher, setModalFetcher] = useState<any>(null);

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

  const fetchPopularMovies = async (page = 1) => {
    try {
      const data = await getPopularMovies(page);
      setPopularMovies(data?.results ?? []);
      return data;
    } catch (error) {
      console.error("Error fetching popular movies", error);
    } finally {
      setLoadingPopular(false);
    }
  };

  const fetchTopRatedMovies = async (page = 1) => {
    try {
      const data = await getTopRatedMovies(page);
      setTopRatedMovies(data?.results ?? []);
      return data;
    } catch (error) {
      console.error("Error fetching top rated movies", error);
    } finally {
      setTopRatedLoading(false);
    }
  };

  const fetchUpcomingMovies = async (page = 1) => {
    try {
      const data = await getUpcomingMovies(page);
      setUpcomingMovies(data?.results ?? []);
      return data;
    } catch (error) {
      console.error("Error fetching top rated movies", error);
    } finally {
      setUpcomingLoading(false);
    }
  };

  const openModal = (title: string, fetcher: any) => {
    setModalTitle(title);
    setModalFetcher(() => fetcher);
    setModalVisible(true);
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
                badgeText="NEW RELEASE"
                onWatchPress={(movie) => {
                  console.log("Watch:", movie.title);
                  router.push(`/movie/${movie.id}`);
                }}
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
            onSeeAllPress={() =>
              openModal("Popular Movies", fetchPopularMovies)
            }
            onMoviePress={(movie) => {
              console.log("Movie Click:", movie.title, movie.id);
              router.push(`/movie/${movie.id}`);
            }}
          />
        )}

        {/* Top Rated Movies */}
        {topRatedLoading ? (
          <PopularMoviesSkeleton />
        ) : (
          <MoviesRowSection
            title="Top Rated"
            movies={topRatedMovies}
            onSeeAllPress={() =>
              openModal("Top Rated Movies", fetchTopRatedMovies)
            }
            onMoviePress={(movie) => {
              console.log("Top Rated Click:", movie.title);
              router.push(`/movie/${movie.id}`);
            }}
          />
        )}

        {/* Upcoming Movies */}
        {upcomingLoading ? (
          <PopularMoviesSkeleton />
        ) : (
          <MoviesRowSection
            title="Upcoming Movies"
            movies={upcomingMovies}
            onSeeAllPress={() =>
              openModal("Upcoming Movies", fetchUpcomingMovies)
            }
            onMoviePress={(movie) => {
              console.log("Upcoming Click:", movie.title);
              router.push(`/movie/${movie.id}`);
            }}
          />
        )}

        {modalFetcher && (
          <MoviesModal
            visible={modalVisible}
            title={modalTitle}
            fetcher={modalFetcher}
            onClose={() => setModalVisible(false)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
