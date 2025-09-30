import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

const successCounter = new Counter("successful_requests");

const SUCCESS_LIMIT = 100;

export const options = {
  vus: 100,
  duration: "20s",
  thresholds: {
    successful_requests: [`count == ${SUCCESS_LIMIT}`],
  },
};

export default function () {
  const sleepTime = Math.floor(Math.random() * 3) + 1;
  
  sleep(sleepTime);

  const res = http.post("http://localhost:3000/inventory");

  if (res.status === 201) {
    const isSuccess = check(res, {
      "reserved": (r) => r.status === 201,
    });

    if (isSuccess) {
      successCounter.add(1);
    }
  } else {
    check(res, {
      "out-of-stock": (r) => r.status === 409,
    });
  }
}
