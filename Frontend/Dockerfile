# syntax=docker/dockerfile:1

# ---------- Build stage ----------
# Wrangler / workerd require Node >= 22.
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies first to leverage Docker layer caching.
COPY package*.json ./
RUN npm install

# Copy source and produce the Cloudflare Worker build.
# Output: dist/client (static assets) + dist/server (worker + wrangler.json).
COPY . .
RUN npm run build

# ---------- Production stage ----------
# This is a TanStack Start app built as a Cloudflare Worker (@cloudflare/vite-plugin).
# It is NOT a plain static site — it must run in the Workers runtime (workerd),
# which needs glibc, so we use the Debian-based node image (not alpine).
FROM node:22-bookworm-slim AS production

WORKDIR /app

ENV NODE_ENV=production
# Port the worker listens on (override at runtime with -e PORT=...).
ENV PORT=8080

# Wrangler runs the built worker locally via workerd.
RUN npm install -g wrangler

# Copy the built worker + assets from the build stage.
# dist/server/wrangler.json points main->index.js and assets->../client.
COPY --from=build /app/dist ./dist

EXPOSE 8080

# Serve the built worker through workerd, bound to all interfaces.
CMD ["sh", "-c", "cd dist/server && wrangler dev --ip 0.0.0.0 --port ${PORT}"]
