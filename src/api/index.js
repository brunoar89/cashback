import axios from 'axios';
import qs from 'qs';

const endPoint = 'https://5df8f2a0e9f79e0014b6aafe.mockapi.io/api/v1';

export function fetch(path, filter) {
  return axios.get(`${endPoint}/${path}?${qs.stringify(filter)}`)
    .then((res) => res.data);
}

export function fetchOne(path, id) {
  return axios.get(`${endPoint}/${path}/${id}`)
    .then((res) => res.data);
}

export function create(path, record) {
  return axios.post(`${endPoint}/${path}`, record)
    .then((res) => res.data);
}

export function update(path, id, record) {
  return axios.put(`${endPoint}/${path}/${id}`, record)
    .then((res) => res.data);
}

export function remove(path, id) {
  return axios.delete(`${endPoint}/${path}/${id}`)
    .then((res) => res.data);
}

export function login(email, password) {
  return axios.post(`${endPoint}/login`, { email, password });
}
