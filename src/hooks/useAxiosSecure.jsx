import axios from "axios";
import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000/`,
});

const useAxiosSecure = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  const accessToken = user?.accessToken

  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log("error in the interceptor", error);
      const status = error.status;
      if (status === 401) {
        logOut()
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
