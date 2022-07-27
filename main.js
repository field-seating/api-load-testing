import http from 'k6/http';
import { sleep } from 'k6';

const endpoint = __ENV.ENDPOINT;

export default function () {
  const res = http.get(`${endpoint}/api/spaces/128/photos`);
  sleep(1);
}
