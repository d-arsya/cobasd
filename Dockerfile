# 1. Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN pnpm build

# 2. Production stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install pnpm
RUN corepack enable

# Copy only required files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose port
EXPOSE 3000

# Run the app (uses Next.js standalone server)
CMD ["node", "server.js"]
