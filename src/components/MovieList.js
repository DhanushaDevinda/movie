// MovieList.js
import React from "react";
import MovieCard from "./MovieCard";
import { Col, Row } from "antd";
import styled from "@emotion/styled";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";

const Container = styled.div`
  margin-top: 64px;
  @media (max-width: 768px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const StyledMovieList = styled.div`
  max-width: 940px;
  margin-left: auto;
  margin-right: auto;
`;

const movies = [
  {
    id: 1,
    title: "Heart of Stone",
    year: 2023,
    poster: img1,
    language: "English",
    showtimes: {
      "21-October-2024": ["5.00 PM"],
      "22-October-2024": ["8.30 PM"],
      "23-October-2024": ["5.00 PM"],
    },
  },
  {
    id: 1,
    title: "Ulajh",
    year: 2024,
    poster: img2,
    language: "Hindi",
    showtimes: {
      "21-October-2024": ["8.30 PM"],
      "22-October-2024": ["5.00 PM"],
      "23-October-2024": ["8.30 PM"],
    },
  },
];

function MovieList() {
  return (
    <Container>
      <StyledMovieList>
        <Row gutter={6} justify="center">
          {movies.map((movie, index) => (
            <Col key={index} xs={12} sm={12} md={12} lg={6} xl={6}>
              <MovieCard
                title={movie.title}
                poster={movie.poster}
                language={movie.language}
                showtimes={movie.showtimes}
                year={movie.year}
              />
            </Col>
          ))}
        </Row>
      </StyledMovieList>
    </Container>
  );
}

export default MovieList;
