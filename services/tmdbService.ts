/*
 * TMDB Service
 * Provides functions to interact with The Movie Database (TMDB) API.
 * Replace `YOUR_TMDB_API_KEY` with your actual TMDB API key.
 */

import { apiClient } from "./apiClient";

/**
 * Generic helper to perform GET requests to TMDB using Axios.
 */
// Deprecated tmdbGet removed; using apiClient directly

/**
 * Types representing the TMDB "Now Playing" response.
 */
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  softcore: boolean;
}

export interface NowPlayingResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch the list of movies that are currently playing in theaters.
 * @param page Optional page number for pagination (default: 1).
 */
export async function getNowPlaying(
  page: number = 1,
): Promise<NowPlayingResponse> {
  const response = await apiClient.get<NowPlayingResponse>(
    "/movie/now_playing",
    {
      params: { page: page.toString() },
    },
  );
  return response.data;
}

// Existing content continues unchanged up to line 69

/**
 * Types representing the TMDB "Popular" response.
 */
export interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch the list of popular movies.
 * @param page Optional page number for pagination (default: 1).
 */
export async function getPopularMovies(
  page: number = 1,
): Promise<PopularMoviesResponse> {
  const response = await apiClient.get<PopularMoviesResponse>(
    "/movie/popular",
    {
      params: { page: page.toString() },
    },
  );
  return response.data;
}

/**
 * Types representing the TMDB "Top Rated" response.
 */
export interface TopRatedMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch the list of top-rated movies.
 * @param page Optional page number for pagination (default: 1).
 */
export async function getTopRatedMovies(
  page: number = 1,
): Promise<TopRatedMoviesResponse> {
  const response = await apiClient.get<TopRatedMoviesResponse>(
    "/movie/top_rated",
    {
      params: { page: page.toString() },
    },
  );
  return response.data;
}

/**
 * Types representing the TMDB "Upcoming" response.
 */
export interface UpcomingMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch the list of upcoming movies.
 * @param page Optional page number for pagination (default: 1).
 */
export async function getUpcomingMovies(
  page: number = 1,
): Promise<UpcomingMoviesResponse> {
  const response = await apiClient.get<UpcomingMoviesResponse>(
    "/movie/upcoming",
    {
      params: { page: page.toString() },
    },
  );
  return response.data;
}

/**
 * Types representing Movie Details, Credits, and Videos.
 */
export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  budget: number;
  genres: Genre[];
  homepage: string | null;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface MovieCreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieVideosResponse {
  id: number;
  results: Video[];
}

/**
 * Fetch details for a specific movie.
 * @param movieId The ID of the movie.
 */
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const response = await apiClient.get<MovieDetails>(`/movie/${movieId}`);
  return response.data;
}

/**
 * Fetch cast and crew for a specific movie.
 * @param movieId The ID of the movie.
 */
export async function getMovieCredits(
  movieId: number,
): Promise<MovieCreditsResponse> {
  const response = await apiClient.get<MovieCreditsResponse>(
    `/movie/${movieId}/credits`,
  );
  return response.data;
}

/**
 * Fetch videos (including trailers) for a specific movie.
 * @param movieId The ID of the movie.
 */
export async function getMovieVideos(
  movieId: number,
): Promise<MovieVideosResponse> {
  const response = await apiClient.get<MovieVideosResponse>(
    `/movie/${movieId}/videos`,
  );
  return response.data;
}

export interface SimilarMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch similar movies for a specific movie.
 * @param movieId The ID of the movie.
 * @param page Optional page number for pagination (default: 1).
 */
export async function getSimilarMovies(
  movieId: number,
  page: number = 1,
): Promise<SimilarMoviesResponse> {
  const response = await apiClient.get<SimilarMoviesResponse>(
    `/movie/${movieId}/similar`,
    {
      params: { page: page.toString() },
    },
  );
  return response.data;
}

// Example usage (remove or comment out in production):
// getPopularMovies().then(data => console.log(data)).catch(err => console.error(err));
