import React, { useState, useEffect } from "react";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import useHarsh from "../../hooks/useHarsh";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/helper/MovieCard";
import Spinner from "../../components/helper/Spinner";

import "./style.css";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pgNum, setPgNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();

  const { data: genreData } = useHarsh(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`,filters)
      .then((res) => {
        setData(res);
        setPgNum((prev) => prev + 1);
        setLoading(false);
      });
  };

  const fetchNxtPgData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pgNum}`,filters)
      .then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPgNum((prev) => prev + 1);
      });
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPgNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }
    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((i) => i.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPgNum(1);
    fetchInitialData();
  };

  return (
    <div className="expPage min-h-[700px] pt-[100px]">
      <ContentWrapper>
        <div className="pgHeader flex justify-between mb-[25px] flex-col md:flex-row">
          <div className="pgTitle text-2xl text-white mb-5 md:mb-0">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters flex gap-[10px] flex-col md:flex-row">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genreData?.genres}
              getOptionLabel={(opt) => opt.name}
              getOptionValue={(opt) => opt.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true}/>}
        {!loading && (
          <>
            {data?.results?.length>0?(
              <InfiniteScroll 
              className="content flex flex-wrap gap-[10px] mb-[50px] md:gap-5"
              dataLength={data?.results?.length || []}
              next={fetchNxtPgData}
              hasMore={pgNum<=data?.total_pages}
              loader={<Spinner />}
            >
              {data?.results?.map((i,index)=>{
                if(i.media_type==="person") return ;
                return (
                  <MovieCard key={index} data={i} mediaType={mediaType} posterBlockCss={"mb-[30px]"}/>
                );
              })}
            </InfiniteScroll>
            ):(
              <span className="resNotFound text-2xl text-[var(--black-light)]">
                No results found for the given query parameters.
              </span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
}
export default Explore;