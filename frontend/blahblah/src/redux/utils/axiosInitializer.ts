import axios from "axios";

export function axiosInitializer() {
  let instance = axios.create({
    baseURL: "https://blahblah.movebxeax.me/web-service",
  });
  return instance;
}

export function openviduInitializer() {
  let instance = axios.create({
    //baseURL: "http://localhost:33332",
    baseURL: "https://blahblah.movebxeax.me/stream-service",
  });
  return instance;
}
