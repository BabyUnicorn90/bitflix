import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Poster from "../../components/Poster";
import Section from "../../components/Section";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100px;
`;

const Input = styled.input`
    all: unset;
    font-size = 28px;
    width:100%;
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  searchTerm,
  error,
  loading,
  handleSubmit,
  updateTerm,
}) => {
  return (
    <Container>
      <Helmet>
        <title>Search | Bitflix</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search for moves or tv shows"
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>

      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
              {movieResults.map((movie) => (
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

          {tvResults && tvResults.length > 0 && (
            <Section title="Tv shows Results">
              {tvResults.map((show) => {
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                  isMovie={false}
                />;
              })}
            </Section>
          )}
          {error && <Message color={"e74c3c"} text={error} />}
          {tvResults &&
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message text="no results" color={"#95a5a6"} />
            )}
        </>
      )}
    </Container>
  );
};

export default SearchPresenter;
