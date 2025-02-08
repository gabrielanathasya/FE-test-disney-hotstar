export const endpoints = {
  movie: {
    nowPlaying: "/movie/now_playing",
    popular: "/movie/popular",
    topRated: "/movie/top_rated",
    upcoming: "/movie/upcoming",
    detail: "/movie",
  },
  series: {
    airingToday: "tv/airing_today",
    onTheAir: "tv/on_the_air",
    popular: "tv/popular",
    topRated: "tv/top_rated",
    detail: "tv",
  },
  discover: {
    netflixOriginals: "/discover/tv?with_networks=213",
    actionMovies: "/discover/movie?with_genres=28",
    comedyMovies: "/discover/movie?with_genres=35",
    horrorMovies: "/discover/movie?with_genres=27",
    romanceMovies: "/discover/movie?with_genres=10749",
    documentaries: "/discover/movie?with_genres=99",
  },
  search: {
    multi: "/search/multi",
    tv: "/search/tv",
    movie: "/search/movie",
  },
  trending: "/trending/all/week",
};
