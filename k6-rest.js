import http from 'k6/http';
import { sleep } from 'k6';

const BACKEND = 'http://odroid2:5000';
const PG_HOST = 'http://controller.lan:8080';
const SESSION_ID = __ENV.SESSION_ID;
const IMPLEMENTATION = __ENV.IMPLEMENTATION;

export const options = {
    vus: 5,
    duration: '30s',
};

export function setup() {
    http.get(`${PG_HOST}/api/v2/session/${SESSION_ID}/measurement/start/CLIENT/${IMPLEMENTATION}`);
    http.get(`${PG_HOST}/api/v2/session/${SESSION_ID}/run/start/CLIENT/1`);
}

export default function () {
    http.get(`${BACKEND}/users/1/with-posts-and-comments?posts=10&comments=10`);
    sleep(1);
}

export function teardown() {
    http.get(`${PG_HOST}/api/v2/session/${SESSION_ID}/run/stop/CLIENT/1`);
    http.get(`${PG_HOST}/api/v2/session/${SESSION_ID}/measurement/stop/CLIENT/${IMPLEMENTATION}`);
}