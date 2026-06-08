#!/bin/bash
HOST=$1
SESSION=$2
RUNS=$3

k6 run -e SESSION_ID=$SESSION -e IMPLEMENTATION=Rest.Controllers.C20 /home/utu/humza/rq3-rest/k6-rest.js