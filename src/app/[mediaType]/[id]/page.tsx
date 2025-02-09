import { MediaTypeEnum } from "@/data/enums/media-type";
import { MovieService } from "@/data/services/movie-service";
import { TvShowService } from "@/data/services/tv-show-service";
import Detail from "@/domains/detail";
import { MediaType } from "@/types/common";
import { notFound } from "next/navigation";

type Props = {
  params: { id: number; mediaType: MediaType };
  searchParams: { season?: number };
};

export default async function DetailPage({ params, searchParams }: Props) {
  const { id, mediaType } = params;
  const { season } = searchParams;

  let data;
  let seasonsDetail;

  if (mediaType === MediaTypeEnum.MOVIE) {
    data = await MovieService.getInstance().getDetail(id);
  } else if (mediaType === MediaTypeEnum.TV) {
    data = await TvShowService.getInstance().getDetail(id);
    if (season) {
      seasonsDetail = await TvShowService.getInstance().getSeasonDetail(
        id,
        season,
      );
    }
  }

  if (!data) {
    notFound();
  }
  return (
    <Detail
      id={id}
      mediaType={mediaType}
      data={data}
      seasonsDetail={seasonsDetail}
    />
  );
}
