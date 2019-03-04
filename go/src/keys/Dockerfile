### BASE IMAGE
FROM golang:1.12 as base

WORKDIR /go/src/keys
RUN curl -fsSL -o /usr/local/bin/dep https://github.com/golang/dep/releases/download/v0.5.0/dep-linux-amd64 && chmod +x /usr/local/bin/dep
RUN go get github.com/cortesi/modd/cmd/modd

## DEPENDENCIES
FROM base AS deps


COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure -vendor-only

COPY . .

## PRODUCTION BUILD
FROM deps AS build

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o keys .

## COPY PRODUCTION BUILD
FROM alpine:latest

WORKDIR /root/
COPY --from=build /go/src/keys/keys .

CMD ["./keys"]
