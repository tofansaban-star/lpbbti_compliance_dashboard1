# Multi-stage build untuk LPBBTI Compliance Dashboard

# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm dan dependencies
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build aplikasi
RUN pnpm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Install serve untuk static file serving
RUN npm install -g serve

# Copy built files dari builder stage
COPY --from=builder /app/dist/public ./public

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

# Start server
CMD ["serve", "-s", "public", "-l", "3000"]
