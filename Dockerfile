FROM oven/bun:1 AS base
WORKDIR /usr/src/app

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "--hot", "--watch", "src/index.tsx" ]