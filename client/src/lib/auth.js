import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const getUserData = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = () => !!getUserData();

export const getUserRole = () => {
  const data = getUserData();
  return data?.role || null;
};
