#!/bin/bash
set -e

cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "No .env found — copy .env.example / see README for VITE_API_URL, VITE_AUTH_CODE."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting query-frontend dev server on http://localhost:5173 ..."
echo "(make sure the backend is running: ../data_acq_cloud/dev_up.sh)"
npm run dev
