FROM node:18-alpine

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies first (for better caching)
COPY package.json package-lock.json ./
RUN npm install --force

# Copy the entire project
COPY . .

# Ensure Prisma schema exists
RUN if [ ! -f "prisma/schema.prisma" ]; then echo "ERROR: Missing prisma/schema.prisma"; exit 1; fi

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application with migrations
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
