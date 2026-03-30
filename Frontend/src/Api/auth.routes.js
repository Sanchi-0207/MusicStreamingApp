import axios from "./axios";

export const registerUser = (data) =>
  axios.post("/register", data);

export const loginUser = (data) =>
  axios.post("/login", data);

export const forgotPassword = (data) =>
  axios.post("/forgot", data);

export const resetPassword = (data) =>
  axios.post("/reset", data);

export const verifyOtp = (data) =>
  axios.post("/otp", data);

export const getSongs = () => {
  const token = localStorage.getItem("token");

  return axios.get("/songs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const upgradeToArtist = () => {
  const token = localStorage.getItem("token");

  return axios.post(
    "/artist",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
};
export const upload = (data) => {
  const token= JSON.parse(localStorage.getItem("userInfo"))?.token;
  return axios.post("/upload", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};