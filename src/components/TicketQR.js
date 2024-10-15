import styled from "@emotion/styled";
import { Alert, QRCode, Space, Typography } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";
import ticketBG from "../assets/ticketBG.svg";

const { Title } = Typography;

const Container = styled.div`
  margin-top: 54px;
  min-height: 70vh;
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  @media (max-width: 768px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const StyledMovieList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 940px;
  margin-left: auto;
  margin-right: auto;
`;

const TypoHeader = styled(Title)`
  color: #262729 !important;
  font-weight: 800 !important;
  font-size: 18px !important;
  margin: 0px 0px 16px !important;
`;

const TypoSubTile = styled(Title)`
  color: #262729 !important;
  margin: 0px 0px 4px !important;
  font-weight: 400 !important;
  font-size: 14px !important;
`;

const TicketQR = () => {
  const [searchParams] = useSearchParams();

  // Access query parameters
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const movieName = searchParams.get("movie-name");
  const username = searchParams.get("username");
  const mobileNo = searchParams.get("mobileNo");

  return (
    <Container>
      <StyledMovieList>
        <Alert
          message="Before closing the page, please make sure to take a screenshot of the ticket below."
          type="warning"
        />
        <br />

        <div
          style={{
            backgroundImage: `url(${ticketBG})`, // Use the imported image
            backgroundSize: "cover", // Adjusts to cover the entire div
            backgroundPosition: "center", // Centers the image
            height: "auto", // Adjust height as necessary
            width: "320px", // Set width
            borderRadius: "8px", // Optional: Add border radius for aesthetics
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add shadow for depth
          }}
        >
          <div style={{ padding: "20px 10px 10px" }}>
            <TypoSubTile>Username:</TypoSubTile>
            <TypoHeader>{username}</TypoHeader>

            <TypoSubTile>Mobile No:</TypoSubTile>
            <TypoHeader>{mobileNo}</TypoHeader>

            <TypoSubTile>Movie name:</TypoSubTile>
            <TypoHeader>{movieName}</TypoHeader>

            <TypoSubTile>Date:</TypoSubTile>
            <TypoHeader>{date}</TypoHeader>

            <TypoSubTile>Time:</TypoSubTile>
            <TypoHeader>{time}</TypoHeader>
          </div>
          <div style={{ padding: "10px" }}>
            <Space direction="vertical" align="center">
              {date && time && movieName && (
                <QRCode
                  // value={`date=${date}&time=${time}&movie-name=${movieName}&username=${username}&mobileNo=${mobileNo}`}
                  value={`Date = ${date}\n
                  Time = ${time}\n
                  Movie Name = ${movieName}\n
                  Username = ${username}\n
                  MobileNo = ${mobileNo}`}
                  color="#262729"
                  size={130}
                  bordered={false}
                />
              )}
            </Space>
          </div>
        </div>
      </StyledMovieList>
    </Container>
  );
};

export default TicketQR;
