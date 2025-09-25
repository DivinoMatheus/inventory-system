import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

const successCounter = new Counter("successful_requests");

const SUCCESS_LIMIT = 100;

export const options = {
  vus: 20,
  duration: "15s",
  thresholds: {
    successful_requests: [`count == ${SUCCESS_LIMIT}`],
  },
};

export default function () {
  const res = http.post("http://localhost:3000/inventory");

  const isSuccess = check(res, {
    "status 201": (r) => r.status === 201,
  });

  if (isSuccess) {
    successCounter.add(1);
  }

  sleep(2);
}
