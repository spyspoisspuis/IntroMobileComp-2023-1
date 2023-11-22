# Build stage
FROM golang:1.21-alpine AS builder

RUN apk add --no-cache git

WORKDIR /tmp/todoAPI

COPY go.mod .
COPY go.sum .

RUN go mod download &&\
    go mod vendor

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o main .

# Final stage
FROM scratch

WORKDIR /app/todoAPI

COPY --from=builder /tmp/todoAPI/main .

CMD ["./main"]