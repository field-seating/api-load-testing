import { sleep, check } from 'k6';

import createUserSignUp from './lib/generators/create-user-sign-up';
import post from './lib/http/post';

const endpoint = __ENV.ENDPOINT;

export function setup() {
  const url = `${endpoint}/api/users`;
  const userData = createUserSignUp();
  post(url, userData);

  return userData;
}

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};

export default function (userData) {
  const url = `${endpoint}/api/signin`;
  const { email, password } = userData;

  const res = post(url, {
    email,
    password,
  });

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
}
