import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "../../components/Section";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Poster from "../../components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 20px;
`;

const TvPresenter = ({ topRated, popular, airingToday, error, loading }) => (
  <>
    <Helmet>
      <title>TV Shows | Ryanflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        <Helmet>
          <title>TV Shows | Ryanflix</title>
        </Helmet>
        {topRated && topRated.length > 0 && (
          <Section title="Top Rated Shows">
            {topRated.map((show) => (
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
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular Shows">
            {popular.map((show) => (
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
              />
            ))}
          </Section>
        )}
        {airingToday && airingToday.length > 0 && (
          <Section title="Airing Today">
            {airingToday.map((show) => (
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
              />
            ))}
          </Section>
        )}
        {error && <Message color={"#e74c3c"} text={error} />}
      </Container>
    )}
    ;
  </>
);

TvPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TvPresenter;
