const ACCESS_TOKEN_KEY_NAME = "accessToken";
const REFRESH_TOKEN_KEY_NAME = "refreshToken";

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
};

export const getAccessToken = () => {
  localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, token);
};

export const getRefreshToken = () => {
  localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};

