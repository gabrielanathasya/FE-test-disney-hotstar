"use client";

import { useHome } from "./hooks/useHome";

export const Home = () => {
  const { data } = useHome();

  console.log({ data });

  return <>home</>;
};

export default Home;
