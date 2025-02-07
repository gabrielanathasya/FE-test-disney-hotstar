export const tmdbService = async (endpoint: string, options?: RequestInit) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", process.env.NEXT_PUBLIC_TMDB_API_KEY!);

  const response = await fetch(url, {
    ...options,
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
