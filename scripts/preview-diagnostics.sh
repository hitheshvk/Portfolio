#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="${ROOT_DIR}/.preview-server.pid"
LOG_FILE="${ROOT_DIR}/.preview-server.log"

is_pid_running() {
  local pid="$1"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

port_is_open() {
  python3 - "$PORT" <<'PY'
import socket
import sys

port = int(sys.argv[1])
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(0.5)
code = s.connect_ex(("127.0.0.1", port))
s.close()
sys.exit(0 if code == 0 else 1)
PY
}

if [[ -f "$PID_FILE" ]]; then
  EXISTING_PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  if is_pid_running "$EXISTING_PID"; then
    echo "Preview server already running (pid ${EXISTING_PID}) on port ${PORT}."
  else
    rm -f "$PID_FILE"
  fi
fi

if [[ ! -f "$PID_FILE" ]]; then
  if port_is_open; then
    echo "Port ${PORT} is already in use by another process."
    echo "Using existing service for preview."
  else
    nohup python3 -m http.server "$PORT" --directory "$ROOT_DIR" >"$LOG_FILE" 2>&1 &
    SERVER_PID="$!"
    echo "$SERVER_PID" > "$PID_FILE"
    sleep 0.2
    if is_pid_running "$SERVER_PID"; then
      echo "Started preview server (pid ${SERVER_PID}) on port ${PORT}."
    else
      echo "Failed to start preview server. Check: ${LOG_FILE}"
      exit 1
    fi
  fi
fi

echo "Open this inside Cursor Simple Browser:"
echo "http://localhost:${PORT}/diagnostics-v5.html"
