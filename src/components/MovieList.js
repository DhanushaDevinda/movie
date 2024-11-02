// MovieList.js
import React from "react";
import MovieCard from "./MovieCard";
import { Col, Row, Alert } from "antd";
import styled from "@emotion/styled";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";

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
    title: "The Wild Robot",
    poster: img1,
    year: 2024,
    language: "English",
    showtimes: {
      "24-September-2024": ["10:00 AM", "01:00 PM"],
      "25-September-2024": ["11:00 AM", "02:00 PM"],
    },
  },
  {
    id: 2,
    title: "Devara",
    poster: img2,
    year: 2024,
    language: "Telugu",
    showtimes: {
      "24-September-2024": ["10:00 AM", "01:00 PM"],
      "26-September-2024": ["09:00 AM", "12:00 PM"],
    },
  },
  {
    id: 3,
    title: "Meiyazhagan",
    poster: img3,
    year: 2024,
    language: "Tamil",
    showtimes: {
      "24-September-2024": ["10:00 AM", "01:00 PM"],
      "25-September-2024": ["11:00 AM", "02:00 PM"],
      "26-September-2024": ["09:00 AM", "12:00 PM"],
    },
  },
  {
    id: 4,
    title: "Kishkindha Kaandam",
    poster: img4,
    year: 2024,
    language: "Malayalam",
    showtimes: {
      "24-September-2024": ["10:00 AM", "01:00 PM"],
      "25-September-2024": ["11:00 AM", "02:00 PM"],
      "26-September-2024": ["09:00 AM", "12:00 PM"],
    },
  },
  {
    id: 5,
    title: "Transformers One",
    poster: img5,
    year: 2024,
    language: "English",
    showtimes: {
      "24-September-2024": ["10:00 AM", "04:00 PM", "07:00 PM"],
      "25-September-2024": ["11:00 AM", "05:00 PM", "08:00 PM"],
      "26-September-2024": ["09:00 AM", "03:00 PM", "06:00 PM"],
    },
  },
  {
    id: 6,
    title: "Ashek",
    poster: img6,
    year: 2024,
    language: "Arabic",
    showtimes: {
      "24-September-2024": ["10:00 AM", "04:00 PM", "07:00 PM"],
      "25-September-2024": ["11:00 AM", "05:00 PM", "08:00 PM"],
      "26-September-2024": ["09:00 AM", "03:00 PM", "06:00 PM"],
    },
  },
  {
    id: 7,
    title: "Never Let Go",
    poster: img7,
    year: 2024,
    language: "English",
    showtimes: {
      "24-September-2024": ["10:00 AM", "04:00 PM", "07:00 PM"],
      "25-September-2024": ["11:00 AM", "05:00 PM", "08:00 PM"],
      "26-September-2024": ["09:00 AM", "03:00 PM", "06:00 PM"],
    },
  },
  {
    id: 8,
    title: "Weekend in Taipei",
    poster: img8,
    year: 2024,
    language: "English",
    showtimes: {
      "24-September-2024": ["10:00 AM", "01:00 PM", "07:00 PM"],
      "25-September-2024": ["11:00 AM", "02:00 PM"],
      "26-September-2024": ["09:00 AM"],
    },
  },
];

function MovieList() {
  return (
    <Container>
      <StyledMovieList>
        <Alert
          message="Seating will be allocated on a first-come, first-served basis."
          type="warning"
        />
        <br />

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
