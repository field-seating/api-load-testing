import http from 'k6/http';

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const post = (url, payload) => {
  const jsonPayload = JSON.stringify(payload);
  return http.post(url, jsonPayload, params);
};

export default post;
