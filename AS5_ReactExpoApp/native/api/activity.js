import axios from "axios";
import { getSecureValue } from "../storage";

const createAxiosInstance = async () => {
  const token = await getSecureValue("token");
  if (token === null) return null; // Return null if there's no token
  return axios.create({
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const fetchData = async () => {
  try {
    const axiosInstance = await createAxiosInstance();
    if (!axiosInstance) {
      // Handle the case where the token is not available
      throw new Error("Token is not available");
    }

    const response = await axiosInstance.get(
      "http://localhost:8100/activities/user"
    );
    // Process the response data if needed
    const data = response.data;

    return { data }; // Resolve the promise with the data
  } catch (error) {
    // Reject the promise with the error
    return { error };
  }
};

export const AddActivityAPI = async (name, when) => {

  try {
    const axiosInstance = await createAxiosInstance();
    if (!axiosInstance) {
      // Handle the case where the token is not available
      throw new Error("Token is not available");
    }

    const response = await axiosInstance.post(
      "http://localhost:8100/activities",
      {
        name: name,
        when: when,
      }
    );
    const id = response.data.ID;
    return { id };
  } catch (error) {
    throw new Error(error);
  }
};

export const UpdateActivityAPI = async (ID, name, when) => {
  try {
    const axiosInstance = await createAxiosInstance();
    if (!axiosInstance) {
      // Handle the case where the token is not available
      throw new Error("Token is not available");
    }

    const response = await axiosInstance.put(
      "http://localhost:8100/activities",
      {
        ID: ID,
        name: name,
        when: when,
      }
    );
    return;
  } catch (error) {
    throw new Error(error);
  }
};

//TODO 4 : request to delete activity
export const DeleteActivityAPI = async (ID) => {
  try {
    const axiosInstance = await createAxiosInstance();
    if (!axiosInstance) {
      // Handle the case where the token is not available
      throw new Error("Token is not available");
    }
    const response = await axiosInstance.delete("http://localhost:8100/activities/"+ID);
    return;
  } catch (error) {
    throw new Error(error);
  }
}