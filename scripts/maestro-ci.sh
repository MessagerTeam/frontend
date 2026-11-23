#!/usr/bin/env bash
set -euo pipefail

adb reverse tcp:8081 tcp:8081

npx expo start --localhost --port 8081 > /tmp/expo-metro.log 2>&1 &
METRO_PID=$!
trap 'kill "$METRO_PID" 2>/dev/null || true' EXIT

for attempt in $(seq 1 60); do
  if curl --silent --fail http://127.0.0.1:8081/status > /dev/null; then
    break
  fi
  sleep 2
done

curl --fail --silent http://127.0.0.1:8081/status > /dev/null
npx expo run:android --no-bundler
npm run test:maestro
