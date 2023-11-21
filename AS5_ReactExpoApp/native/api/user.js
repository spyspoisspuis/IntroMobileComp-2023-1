import {saveSecureValue} from "../storage";
import axios from "axios";
export const login = async (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:8100/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.result === false) {
          // If login fails, reject the Promise with an error message
          reject(new Error("Username or password incorrect"));
        } else {
          // If login is successful, resolve the Promise with the token
          saveSecureValue("token", res.data.token);
          resolve(true);
        }
      })
      .catch((error) => {
        // If there's an error with the request, reject the Promise with the error
        reject(error);
      });
  });
};

export const ResetPassword = async (username, password) => {
    return new Promise((resolve, reject) => {
      axios
        .put("http://localhost:8100/reset-password", {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.result === false) {
            // If login fails, reject the Promise with an error message
            reject(new Error("Username not found"));
          } else {
            // If login is successful, resolve the Promise with the token
            saveSecureValue("token", res.data.token);
            resolve(true);
          }
        })
        .catch((error) => {
          // If there's an error with the request, reject the Promise with the error
          reject(error);
        });
    });
};