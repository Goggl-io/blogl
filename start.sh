#!/bin/sh

. ./db.env

bun run --hot src/index.tsx
