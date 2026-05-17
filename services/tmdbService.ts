/*
 * TMDB Service
 * Provides functions to interact with The Movie Database (TMDB) API.
 * Replace `YOUR_TMDB_API_KEY` with your actual TMDB API key.
 */
import axios from "axios";
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Generic helper to perform GET requests to TMDB using Axios.
 */
async function tmdbGet<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  // Create an Axios instance with base URL and API key.
  const tmdbApi = axios.create({
    baseURL: BASE_URL,
    params: { api_key: API_KEY },
  });
  // Perform GET request; Axios will merge additional params.
  const response = await tmdbApi.get<T>(path, { params });
  return response.data;
}

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
  return tmdbGet<NowPlayingResponse>("/movie/now_playing", {
    page: page.toString(),
  });
}

// Example usage (remove or comment out in production):
// getNowPlaying().then(data => console.log(data)).catch(err => console.error(err));
