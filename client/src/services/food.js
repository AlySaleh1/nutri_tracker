import axios from "axios";
const baseUrl = "/api/";

const process = (fd) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const req = axios.post(baseUrl, fd, config);
  return req;
};

const getNutriInfo = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

const foodHandler = { process, getNutriInfo };
export default foodHandler;
