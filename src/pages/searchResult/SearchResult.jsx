import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from '../../components/helper/MovieCard';
import Spinner from '../../components/helper/Spinner';
import noResults from "../../assets/no-results.png";
import { fetchDataFromApi } from "../../utils/api";

import "./style.css";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if(data?.results) {
          setData({ ...data, results: [...data?.results, ...res.results] })
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      })
  }

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResPg min-h-[700px] pt-[100px]">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pgTitle text-2xl text-white mb-[25px]">
                {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
              </div>

              <InfiniteScroll
                className='content flex flex-wrap gap-[10px] mb-[50px] md:gap-5'
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner initial={true} />} >

                {data?.results?.map((i, index) => {
                  if(i.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={i}
                      Search={true}
                      posterBlockCss={"mb-5"}
                    />
                  );
                })}
              </InfiniteScroll>

            </>
          ) : (
            <span className="resNotFound text-2xl text-[color:var(--black-light)]">
              No results found for '{query}'
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
};
export default SearchResult;