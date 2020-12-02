import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import Section from "../../components/Section";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Poster from "../../components/Poster";

const Container = styled.div`
  padding: 20px;
`;

// jsx에서 조건에 따라 보여질 화면과 보여지지않을 화면 구분하기: 삼항연산자 활용
const MoviePresenter = ({ nowPlaying, upcoming, popular, error, loading }) => {
  return (
    <>
      <Helmet>
        <title>Movies | Bitflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  isMovie={true}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                ></Poster>
              ))}
            </Section>
          )}

          {upcoming && upcoming.length > 0 && (
            <Section title="upcoming Movies">
              {upcoming.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  isMovie={true}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                ></Poster>
              ))}
            </Section>
          )}

          {popular && popular.length > 0 && (
            <Section title="Popular Movies">
              {popular.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  isMovie={true}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                ></Poster>
              ))}
            </Section>
          )}
          {error && <Message color={"e74c3c"} text={error}></Message>}
        </Container>
      )}
    </>
  );
};

export default MoviePresenter;
