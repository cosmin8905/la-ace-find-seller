# This is a multi-stage build. The first stage builds the app.
# The second stage copies the binary and adds it to a lightweight alpine container.
FROM golang:1.13

WORKDIR /go/src/github.com/linuxacademy/products
# Copy the application code to the working dir.
# For this to work the docker build command needs to set the context to the parent of the app dir.
COPY ./app .
# Install the dependencies

#RUN go get google.golang.org/api/option

#Problems with golang option
#https://stackoverflow.com/questions/59705647/docker-build-failing-google-golang-org-api-option
RUN go get .
# Build for Linux. Save in the tmp dir 
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /tmp/app .

# Stage 2
FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=0 /go/src/github.com/linuxacademy/products/products.sql .
COPY --from=0 /tmp/app .
CMD ["./app"]  
