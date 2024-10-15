import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

import styled from "@emotion/styled";
import { Button, Typography, Modal, Form, Input, message } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useMovie } from "../utils/MovieContext";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";

const { Title } = Typography;

const SoldOut = styled(Title)`
  color: #d8b26e !important;
  margin: 0.5em 0 !important;
  text-align: left;
  font-weight: 800 !important;
  font-size: 18px !important;
`;

const TypoHeader = styled(Title)`
  color: white !important;
  margin: 0.5em 0 !important;
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
  max-width: 940px;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
`;

const ShowtimeButton = styled(Button)`
  background-color: #d8b26e; /* Default background color */
  color: #222c3c !important;
  padding: 20px !important;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;
  margin: 8px 8px 8px 0px;
  &:hover {
    background-color: #c59e5f !important;
  }
`;

const SubmitButton = styled(Button)`
  width: -webkit-fill-available;
  background-color: #d8b26e; /* Default background color */
  color: #222c3c !important;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;
  margin: 0px 10px 0px 10px;
  &:hover {
    background-color: #c59e5f !important;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-title {
    text-align: center;
  }
  .ant-modal-body {
    display: flex;
    justify-content: center;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: center;
  }
  .ant-form-item {
    margin: 8px;
  }
  .ant-modal-footer {
    margin: 0px;
  }
  input {
    border-radius: 4px !important;
  }
`;

const movies = [
  {
    id: 4,
    title: "Top Gun:Maverick",
    poster: img1,
  },
  {
    id: 2,
    title: "Sector 36",
    poster: img2,
  },
];
const MovieShowtimes = () => {
  const [bookings, setBookings] = useState([]); // State to hold bookings
  const [setError] = useState(null); // State to hold any errors
  const [modalOpen, setModalOpen] = useState(false);
  const { name } = useParams();
  const { selectedMovie } = useMovie();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [details, setDetails] = useState("");

  useEffect(() => {
    getAllBooking();
    if (selectedMovie == null) navigate("/");
  });

  // Function to fetch bookings
  const getAllBooking = async () => {
    let { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("movie_name", name);

    if (error) {
      console.error("Error fetching bookings:", error);
      setError(error); // Set error state if there's an issue
    } else {
      console.log("🚀 ~ getAllBooking ~ bookings:", data);
      setBookings(data); // Store the bookings data in state
    }
  };

  const addBooking = async (date, time, name, userName, mobileNumber) => {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          movie_name: name,
          date: date,
          time: time,
          name: userName,
          mobile_number: mobileNumber,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error);
      message.error("Booking failed! Please try again."); // Display error message
    } else {
      message.success("Booking successful!"); // Display success message in UI
    }
  };

  const filteredBookings = movies.filter((item) => item.title === name);

  const onFinish = (values) => {
    console.log("Form values:", values);
    setModalOpen(false); // Close modal on successful submission

    navigate(
      `/ticket?date=${details.date}&time=${details.time}&movie-name=${details.name}&username=${values.username}&mobileNo=${values.mobileNo}`
    );
    console.log(
      `date ${details.date}, time ${details.time} movie-name ${details.name}`
    );
    form.resetFields();
    addBooking(
      details.date,
      details.time,
      details.name,
      values.username,
      values.mobileNo
    );
  };

  return (
    <Container
      style={{
        backgroundImage: `url(${filteredBookings[0].poster})`,
        backgroundSize: "cover",
      }}
    >
      <StyledMovieList>
        <TypoHeader level={5}>Jebel Ali</TypoHeader>

        {selectedMovie &&
          Object.entries(selectedMovie).map(([date, times]) => {
            const filteredBookings = bookings.filter(
              (booking) => booking.date === date
            );
            if (filteredBookings.length < 30) {
              return (
                <div key={date}>
                  <TypoHeader level={5}>{date}</TypoHeader>
                  <TypoSubTile>{`${
                    30 - filteredBookings.length
                  } seats remain`}</TypoSubTile>

                  <div style={{ display: "flex" }}>
                    {times.map((time, index) => (
                      <ShowtimeButton
                        key={index}
                        onClick={() => {
                          setModalOpen(true);
                          setDetails({
                            date,
                            time,
                            name,
                          });
                        }}
                      >
                        {time}
                      </ShowtimeButton>
                    ))}
                  </div>
                </div>
              );
            } else {
              return (
                <>
                  <TypoHeader level={5}>{date}</TypoHeader>{" "}
                  <SoldOut level={5}>SOLD OUT</SoldOut>
                </>
              );
            }
          })}

        <StyledModal
          title="Enter User Details"
          centered
          closable={false}
          open={modalOpen}
          onOk={() => setModalOpen(false)} // The action for your Submit button
          footer={[
            <SubmitButton
              key="submit"
              type="primary"
              onClick={() => form.submit()}
            >
              Submit
            </SubmitButton>,
          ]}
          width="250px"
        >
          <Form name="basic" onFinish={onFinish} form={form} layout="vertical">
            <Form.Item
              label="Name"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mobile No"
              name="mobileNo"
              rules={[
                { required: true, message: "Please input your mobile number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </StyledModal>
      </StyledMovieList>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust opacity for darkness
          zIndex: 0, // Ensure overlay is on top
        }}
      />
    </Container>
  );
};

export default MovieShowtimes;
