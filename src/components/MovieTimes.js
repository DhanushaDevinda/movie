import React, { useEffect, useState, useCallback } from "react";

import styled from "@emotion/styled";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { useMovie } from "../utils/MovieContext";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";

const { Title } = Typography;

// const SoldOut = styled(Title)`
//   color: #c74250 !important;
//   margin: 0.5em 0 !important;
//   text-align: left;
//   font-weight: 800 !important;
//   font-size: 18px !important;
// `;

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
  background-color: #c74250; /* Default background color */
  color: #fff !important;
  padding: 20px !important;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;
  margin: 8px 8px 8px 0px;
  &:hover {
    background-color: #e05868 !important;
  }
`;

const SubmitButton = styled(Button)`
  width: -webkit-fill-available;
  background-color: #c74250; /* Default background color */
  color: #fff !important;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;
  margin: 0px 10px 0px 10px;
  &:hover {
    background-color: #e05868 !important;
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
    id: 1,
    title: "The Wild Robot",
    poster: img1,
  },
  {
    id: 2,
    title: "Devara",
    poster: img2,
  },
  {
    id: 3,
    title: "Meiyazhagan",
    poster: img3,
  },
  {
    id: 4,
    title: "Kishkindha Kaandam",
    poster: img4,
  },
  {
    id: 5,
    title: "Transformers One",
    poster: img5,
  },
  {
    id: 6,
    title: "Ashek",
    poster: img6,
  },
  {
    id: 7,
    title: "Never Let Go",
    poster: img7,
  },
  {
    id: 8,
    title: "Weekend in Taipei",
    poster: img8,
  },
];

const MovieShowtimes = () => {
  const [bookings, setBookings] = useState([]); // State to hold bookings
  const [modalOpen, setModalOpen] = useState(false);
  const { name } = useParams();
  const { selectedMovie } = useMovie();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [details, setDetails] = useState("");

  const getAllBooking = useCallback(async () => {
    if (selectedMovie == null) navigate("/");

    let { data, error } = { data: [], error: "" };

    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      console.log("🚀 ~ getAllBooking ~ bookings:", data);
      setBookings(data);
    }
  }, [selectedMovie, navigate]);

  useEffect(() => {
    getAllBooking();
  }, [getAllBooking]);

  const addBooking = async (date, time, name, userName, mobileNumber) => {
    console.log({
      movie_name: name,
      date: date,
      time: time,
      name: userName,
      mobile_number: mobileNumber,
    });
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
        {selectedMovie &&
          Object.entries(selectedMovie).map(([date, times]) => {
            const filteredBookings = bookings.filter(
              (booking) => booking.date === date
            );
            // if (filteredBookings.length < 30) {
            return (
              <div key={date}>
                <TypoHeader level={5}>{date}</TypoHeader>
                <TypoSubTile>{`${filteredBookings.length} guests have already taken their seats in the cinema.`}</TypoSubTile>

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
            // } else {
            //   return (
            //     <>
            //       <TypoHeader level={5}>{date}</TypoHeader>{" "}
            //       <SoldOut level={5}>SOLD OUT</SoldOut>
            //     </>
            //   );
            // }
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
