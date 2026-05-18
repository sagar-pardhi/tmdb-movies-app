import CastCard from "@/components/cast-card";
import MoviesRowSection from "@/components/movies-row-section";
import PopularMoviesSkeleton from "@/components/popular-movies-skeleton";
import TrailerPlayer from "@/components/trailer-player";
import { formatRuntime } from "@/lib/utils";
import {
  Cast,
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  getSimilarMovies,
  Movie,
  MovieDetails,
  Video,
} from "@/services/tmdbService";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const movieId = Number(id);

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [similarLoading, setSimilarLoading] = useState(true);

  useEffect(() => {
    if (movieId) loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);

      const details = await getMovieDetails(movieId);
      const credits = await getMovieCredits(movieId);
      const trailerData = await getMovieVideos(movieId);
      const similar = await getSimilarMovies(movieId);

      const videos = trailerData.results;

      const trailer =
        videos.find((v: any) => v.type === "Trailer" && v.site === "YouTube") ||
        videos.find((v: any) => v.site === "YouTube");

      setMovie(details);
      setCast(credits.cast);
      setTrailer(trailer || null);
      setSimilarMovies(similar.results);
    } catch (error) {
      console.log("Movie Details Error:", error);
    } finally {
      setLoading(false);
      setSimilarLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0B0B0F] justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  const bannerUrl = movie?.backdrop_path
    ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}`
    : `${TMDB_IMAGE_BASE}${movie?.poster_path}`;

  return (
    <ScrollView
      className="flex-1 bg-[#0B0B0F]"
      showsVerticalScrollIndicator={false}
    >
      {/* Banner */}
      <View className="h-[340px] rounded-b-3xl overflow-hidden">
        <ImageBackground source={{ uri: bannerUrl }} className="flex-1">
          <LinearGradient
            colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0.3)", "rgba(0,0,0,1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1, justifyContent: "space-between" }}
          >
            {/* Back Button */}
            <View className="px-4 pt-14">
              <TouchableOpacity
                className="justify-center items-center w-12 h-12 rounded-full bg-black/50"
                onPress={() => router.back()}
              >
                <Text className="text-xl font-bold text-white">←</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Info */}
            <View className="p-4">
              <Text className="text-3xl font-extrabold text-white">
                {movie?.title}
              </Text>

              <View className="flex-row gap-3 items-center mt-2">
                <Text className="text-sm font-bold text-yellow-400">
                  ⭐ {movie?.vote_average.toFixed(1)}
                </Text>

                <Text className="text-sm text-zinc-300">
                  {movie?.release_date?.slice(0, 4)}
                </Text>

                <Text className="text-sm text-zinc-300">
                  {formatRuntime(movie?.runtime!)} min
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      {/* Overview */}
      <View className="px-4 mt-6">
        <Text className="mb-2 text-lg font-bold text-white">Overview</Text>
        <Text className="text-sm leading-6 text-zinc-300">
          {movie?.overview}
        </Text>
      </View>

      {/* Cast */}
      <View className="mt-6">
        <Text className="px-4 mb-3 text-lg font-bold text-white">Cast</Text>

        <FlatList
          data={cast}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => <CastCard cast={item} />}
        />
      </View>

      {/* Trailer */}
      <View className="px-4">
        {trailer ? (
          <TrailerPlayer youtubeKey={trailer.key} />
        ) : (
          <Text className="mt-6 text-sm text-zinc-400">
            Trailer not available
          </Text>
        )}
      </View>

      {similarLoading ? (
        <PopularMoviesSkeleton />
      ) : (
        <MoviesRowSection
          title="Similar Movies"
          movies={similarMovies}
          onMoviePress={(movie) => router.push(`/movie/${movie.id}`)}
        />
      )}

      <View className="h-10" />
    </ScrollView>
  );
}
