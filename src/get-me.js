import { sleep, check } from 'k6';
import http from 'k6/http';

import createUserSignUp from './lib/generators/create-user-sign-up';
import post from './lib/http/post';

const endpoint = __ENV.ENDPOINT;

export function setup() {
  const url = `${endpoint}/api/users`;
  const userData = createUserSignUp();
  post(url, userData);

  const { email, password } = userData;

  const signInUrl = `${endpoint}/api/signin`;
  const res = post(signInUrl, {
    email,
    password,
  });

  return res.json();
}

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};

export default function (singInData) {
  const url = `${endpoint}/api/users/me`;
  const {
    data: { token },
  } = singInData;

  const res = http.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1);
}
