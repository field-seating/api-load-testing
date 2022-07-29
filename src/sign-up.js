import { sleep, check } from 'k6';

import createUserSignUp from './lib/generators/create-user-sign-up';
import post from './lib/http/post';

const endpoint = __ENV.ENDPOINT;

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};

export default function () {
  const url = `${endpoint}/api/users`;
  const res = post(url, createUserSignUp());

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
