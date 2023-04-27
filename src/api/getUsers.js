import axios from "axios";

const BASE_URL = "https://644a5975a8370fb3214bd036.mockapi.io/api/v1/users";

export const getUsers = async () => {
  const result = await axios.get(BASE_URL);
  console.log(result);
};
