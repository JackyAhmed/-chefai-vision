# ── Stage 1: Build the React frontend ─────────────────────────────────────
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files and install deps
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# ── Stage 2: Production server ─────────────────────────────────────────────
FROM node:20-alpine AS production

# Install build tools needed for better-sqlite3 native compilation
# (alpine needs python3 + make + gcc + g++)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy backend package files and install deps
# better-sqlite3 will compile from source here cleanly on alpine
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# Copy backend source
COPY backend/ ./backend/

# Copy the built frontend from stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Railway injects PORT at runtime — expose it
EXPOSE 3001

# Start the server
CMD ["node", "backend/server.js"]
