import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MovieGridCard from "./movies-grid";

type Props = {
  visible: boolean;
  title: string;
  fetcher: (page: number) => Promise<any>;
  onClose: () => void;
};

export default function MoviesModal({
  visible,
  title,
  fetcher,
  onClose,
}: Props) {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (visible) {
      loadMovies(1);
    }
  }, [visible]);

  const loadMovies = async (pageNumber: number) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const data = await fetcher(pageNumber);

      const newMovies = data.results.filter((m: any) => m.poster_path);

      if (pageNumber === 1) {
        setMovies(newMovies);
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
      }

      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.log(`${title} Modal Error:`, err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (loadingMore) return;
    if (page >= totalPages) return;

    loadMovies(page + 1);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMovies(1);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View className="flex-1 bg-[#0B0B0F] pt-14">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 mb-4">
          <Text className="text-2xl font-bold text-white">{title}</Text>

          <TouchableOpacity
            onPress={onClose}
            className="justify-center items-center w-10 h-10 rounded-full bg-white/10"
          >
            <Text className="text-lg font-bold text-white">✕</Text>
          </TouchableOpacity>
        </View>

        {/* Loading */}
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <FlatList
            data={movies}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 30 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="white"
              />
            }
            renderItem={({ item }) => (
              <MovieGridCard
                movie={item}
                onPress={(movie: any) => router.push(`/movie/${movie.id}`)}
              />
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.4}
            ListFooterComponent={
              loadingMore ? (
                <View className="py-6">
                  <ActivityIndicator color="white" />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </Modal>
  );
}
