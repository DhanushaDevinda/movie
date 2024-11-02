import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import React from "react";
import { useMovie } from "../utils/MovieContext";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const ShowtimeButton = styled(Button)`
  background-color: #c74250; /* Default background color */
  color: #ffff !important;
  padding: 20px !important;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #e05868 !important;
  }
`;

const Card = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  color: white;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const TypoHeader = styled(Title)`
  color: white !important;
  margin: 0.5em 0 0 0 !important;
  text-align: left;
  font-weight: 800 !important;
  font-size: 18px !important;
`;

const TypoSubTile = styled(Title)`
  color: white !important;
  margin: 0 0 1.5em !important;
  text-align: left !important;
  font-weight: 400 !important;
  font-size: 12px !important;
`;

const StyledPoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const MovieCard = ({ title, language, poster, showtimes, year }) => {
  const { setSelectedMovie } = useMovie();
  const navigate = useNavigate();
  return (
    <Card>
      <StyledPoster src={poster} alt="movie poster" />

      <TypoHeader level={5}>{title}</TypoHeader>
      <TypoSubTile>
        {year}
        <br />
        {`Language: ${language}`}
      </TypoSubTile>

      <ShowtimeButton
        onClick={() => {
          setSelectedMovie(showtimes);
          navigate(`/movieTimes/${title}`);
        }}
      >
        Showtimes
      </ShowtimeButton>
    </Card>
  );
};

export default MovieCard;
