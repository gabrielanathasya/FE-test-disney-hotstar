import { MediaTypeEnum } from "@/data/enums/media-type";
import { MovieService } from "@/data/services/movie-service";
import { TvShowService } from "@/data/services/tv-show-service";
import Detail from "@/domains/detail";
import { MediaType } from "@/types/common";
import { MovieDetail } from "@/types/movies";
import { SeasonDetail, TVShowDetail } from "@/types/tv-shows";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: { id: number; mediaType: MediaType };
};

export default async function DetailPage({ params }: Props) {
  const { id, mediaType } = params;

  let data: MovieDetail | TVShowDetail;
  let allSeasonDetails: SeasonDetail[] = [];
  if (mediaType === MediaTypeEnum.MOVIE) {
    data = await MovieService.getInstance().getDetail(id);
  } else if (mediaType === MediaTypeEnum.TV) {
    data = await TvShowService.getInstance().getDetail(id);

    if (data.number_of_seasons) {
      const seasonNumbers = [
        ...Array((data as TVShowDetail).number_of_seasons),
      ];
      allSeasonDetails = await Promise.all(
        seasonNumbers.map((s: number, index: number) =>
          TvShowService.getInstance().getSeasonDetail(id, index + 1),
        ),
      );
    }

    if (!data) {
      notFound();
    }
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Detail
          id={id}
          mediaType={mediaType}
          data={data}
          allSeasonDetails={allSeasonDetails}
        />
      </Suspense>
    );
  }
}
