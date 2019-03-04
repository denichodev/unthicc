### BASE IMAGE
FROM golang:1.12 as base

WORKDIR /go/src/keys
RUN curl -fsSL -o /usr/local/bin/dep https://github.com/golang/dep/releases/download/v0.5.0/dep-linux-amd64 && chmod +x /usr/local/bin/dep

## DEVELOPMENT
FROM base AS dev

RUN go get github.com/cortesi/modd/cmd/modd

COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure -vendor-only

COPY . .

## PRODUCTION BUILD
FROM base AS build

COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure -vendor-only

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o keys .

## COPY PRODUCTION BUILD
FROM alpine:latest

WORKDIR /root/
COPY --from=build /go/src/keys .

CMD ["./keys"]
