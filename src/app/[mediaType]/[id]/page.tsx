import { MediaTypeEnum } from "@/data/enums/media-type";
import { MovieService } from "@/data/services/movie-service";
import { TvShowService } from "@/data/services/tv-show-service";
import Detail from "@/domains/detail";
import { MediaType } from "@/types/common";
import { notFound } from "next/navigation";

type Props = {
  params: { id: number; mediaType: MediaType };
};

export default async function DetailPage({ params }: Props) {
  const { id, mediaType } = params;

  let data;
  if (mediaType === MediaTypeEnum.MOVIE) {
    data = await MovieService.getInstance().getDetail(id);
  } else if (mediaType === MediaTypeEnum.TV) {
    data = await TvShowService.getInstance().getDetail(id);
  }

  if (!data) {
    notFound();
  }
  return <Detail id={id} mediaType={mediaType} data={data} />;
}
