import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseURL, newObject);
  return request.then(response => response.data);
};

const update = newObject => {
  const request = axios.put(`${baseURL}/${newObject.id}`, newObject);
  return request.then(response => response.data);
};

const remove = newObject => {
  const request = axios.delete(`${baseURL}/${newObject.id}`);
  return request.then(response => response);
};

export default { getAll, create, update, remove };
