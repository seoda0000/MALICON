import axios from "axios";

export function axiosInitializer() {
  let instance = axios.create({
    baseURL: "http://blahblah.movebxeax.me/web-service",
  });
  return instance;
}