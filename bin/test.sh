#!/usr/bin/env bash

# Load env vars from .env file
set -a
source .env.test
set +a

export NODE_ENV=test
export DATABASE_NAME="$DATABASE_NAME"
export DATABASE_TABLE_NAME="$DATABASE_TABLE_NAME"
export DATABASE_PASSWORD="$DATABASE_PASSWORD"
export DATABASE_USER="$DATABASE_USER"
export DATABASE_HOST="$DATABASE_HOST"
export DATABASE_PORT="$DATABASE_PORT"

npx knex migrate:latest --env test --knexfile ./knexfile.ts

mocha -r ts-node/register test/**/*.test.ts
