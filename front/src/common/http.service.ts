import axios from "axios";

let baseUrl = 'https://minter-scoring.space/api/';

export const HTTP = axios.create({
  baseURL: baseUrl
});

export const getScoring = async (address: string) => {
  let res = await HTTP.get(`${address}`);
  return res.data;
}

export const getScore = async (address: string) => {
  let res = await HTTP.get(`score/${address}`);
  return res.data;
}

export const getProfile = async (address: string) => {
  let res = await HTTP.get(`profile/${address}`);
  return res.data;
}