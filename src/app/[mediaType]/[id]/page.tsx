import { endpoints } from "@/data/consts/endpoints";
import { MediaType } from "@/data/models/common";
import { tmdbService } from "@/data/services/tmdb-service";
import Detail from "@/domains/detail";

type Props = {
  params: { id: number; mediaType: MediaType };
};

export default async function DetailPage({ params }: Props) {
  const { id, mediaType } = params;
  let data;
  if (mediaType === "movie") {
    data = await tmdbService(`${endpoints.movie.detail}/${id}`);
  } else {
    data = await tmdbService(`${endpoints.series.detail}/${id}`);
  }
  return <Detail id={id} mediaType={mediaType} data={data} />;
}
