import http from 'k6/http';
import { sleep, check } from 'k6';

const endpoint = __ENV.ENDPOINT;

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};

export default function () {
  const res = http.get(`${endpoint}/health`);

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
}
