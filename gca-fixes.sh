sed -i.bak 's/FROM golang:1.9/FROM golang:1.10/' ./products/build/Dockerfile
rm ./products/build/Dockerfile.bak

sed -i.bak 's/golang:1.9/golang:1.11/' ./frontend/build/build.sh
rm ./frontend/build/build.sh.bak

sed -i.bak 's/runtime: go/runtime: go111/' ./frontend/app/app.yaml 
sed -i.bak '/api_version: go1/d' ./frontend/app/app.yaml 
sed -i.bak 's/script: _go_app/script: auto/' ./frontend/app/app.yaml 
rm ./frontend/app/app.yaml.bak

sed -i.bak 's/..\/app\/app.yaml/$GOPATH\/src\/github.com\/linuxacademy\/frontend\/app.yaml/' ./frontend/cloud/deploy.sh
rm ./frontend/cloud/deploy.sh.bak

sed -i.bak 's/*.go $GOPATH/* $GOPATH/' ./frontend/build/go.sh
rm ./frontend/build/go.sh.bak

sed -i.bak '/--cluster-version/d' ./products/cloud/setup.sh 
rm ./products/cloud/setup.sh.bak

sed -i.bak 's/--stage-bucket=$PRIVATE_ASSETS/& --runtime nodejs8 /' ./image_parser/deploy/deploy.sh
rm ./image_parser/deploy/deploy.sh.bak
