import axios from "axios";
import { LOGIN_ADMIN, REGISTER_ADMIN, AUTH_ADMIN } from "./types";

export function loginAdmin(dataTosubmit) {
  const request = axios
    .post("/api/admins/login", dataTosubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_ADMIN,
    payload: request,
  };
}

export function registerAdmin(dataTosubmit) {
  const request = axios
    .post("/api/admins/register", dataTosubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_ADMIN,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/admins/auth")
    .then((response) => response.data);

  return {
    type: AUTH_ADMIN,
    payload: request,
  };
}
