import GenreRow from "@/components/genre-row";
import HeroCarousel from "@/components/hero-carousel";
import MoviesRowSection from "@/components/movies-row-section";
import MoviesModal from "@/components/movies-modal";
import PopularMoviesSkeleton from "@/components/popular-movies-skeleton";
import {
  getTopRatedMovies,
  getTrendingMovies,
  getTvGenres,
  getUpcomingMovies,
} from "@/services/tmdbService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState("Movies");

  const [heroMovies, setHeroMovies] = useState<any[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFetcher, setModalFetcher] = useState<any>(null);

  const openModal = (title: string, fetcher: any) => {
    setModalTitle(title);
    setModalFetcher(() => fetcher);
    setModalVisible(true);
  };

  useEffect(() => {
    loadExploreData();
  }, []);

  const loadExploreData = async () => {
    try {
      setLoadingHero(true);
      setLoadingUpcoming(true);
      setLoadingTopRated(true);
      setLoadingGenres(true);

      const trending = await getTrendingMovies();
      setHeroMovies(
        trending.results.filter((m: any) => m.backdrop_path).slice(0, 6),
      );

      const upcoming = await getUpcomingMovies(1);
      setUpcomingMovies(
        upcoming.results.filter((m: any) => m.poster_path).slice(0, 10),
      );

      const topRated = await getTopRatedMovies(1);
      setTopRatedMovies(
        topRated.results.filter((m: any) => m.poster_path).slice(0, 10),
      );

      const genreData = await getTvGenres();
      setGenres(genreData.genres.slice(0, 8));
    } catch (err) {
      console.log("Explore Error:", err);
    } finally {
      setLoadingHero(false);
      setLoadingUpcoming(false);
      setLoadingTopRated(false);
      setLoadingGenres(false);
    }
  };

  const tabs = ["Movies", "TV Shows", "Genres", "Collections"];

  return (
    <ScrollView
      className="flex-1 bg-[#0B0B0F]"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-14">
        <Text className="text-3xl font-extrabold text-white">Explore</Text>

        <TouchableOpacity
          onPress={() => {
            // router.push("/search")
          }}
        >
          <Ionicons name="search" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mt-6"
      >
        <View className="flex-row gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-5 py-3 rounded-2xl ${
                  isActive ? "bg-indigo-500" : "bg-white/10"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Hero Carousel */}
      <View className="mt-6">
        {loadingHero ? (
          <View className="h-[200px] mx-4 rounded-3xl bg-white/10" />
        ) : (
          <HeroCarousel
            movies={heroMovies}
            onMoviePress={(movie) => router.push(`/movie/${movie.id}`)}
          />
        )}
      </View>

      {/* Browse by Genre */}
      <View className="mt-7">
        <Text className="px-4 mb-3 text-lg font-bold text-white">
          Browse by Genre
        </Text>

        {loadingGenres ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4 px-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <View
                  key={i}
                  className="w-[70px] h-[70px] bg-white/10 rounded-2xl"
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <GenreRow genres={genres} />
        )}
      </View>

      {/* New Releases */}
      {loadingUpcoming ? (
        <PopularMoviesSkeleton />
      ) : (
        <MoviesRowSection
          title="Upcoming Movies"
          movies={upcomingMovies}
          onSeeAllPress={() => openModal("Upcoming Movies", getUpcomingMovies)}
          onMoviePress={(movie) => router.push(`/movie/${movie.id}`)}
        />
      )}

      {/* Top Rated */}
      {loadingTopRated ? (
        <PopularMoviesSkeleton />
      ) : (
        <MoviesRowSection
          title="Top Rated"
          movies={topRatedMovies}
          onSeeAllPress={() => openModal("Top Rated Movies", getTopRatedMovies)}
          onMoviePress={(movie) => router.push(`/movie/${movie.id}`)}
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

      <View className="h-12" />
    </ScrollView>
  );
}
