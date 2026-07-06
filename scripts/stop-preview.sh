#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="${ROOT_DIR}/.preview-server.pid"

if [[ ! -f "$PID_FILE" ]]; then
  echo "No preview pid file found. Nothing to stop."
  exit 0
fi

PID="$(cat "$PID_FILE" 2>/dev/null || true)"
if [[ -z "$PID" ]]; then
  rm -f "$PID_FILE"
  echo "Preview pid file was empty. Cleaned up."
  exit 0
fi

if kill -0 "$PID" 2>/dev/null; then
  kill "$PID"
  echo "Stopped preview server (pid ${PID})."
else
  echo "Preview server process ${PID} is not running."
fi

rm -f "$PID_FILE"
