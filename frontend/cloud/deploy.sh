#!/bin/bash

# Import the settings from the common settings file
source ../../common/project_settings.sh

export GOPATH="$(dirname $PWD)/vendor"

# Build the code into the vendor dir.
bash ../build/build.sh

GOPATH="$(dirname "$PWD"/src)" gcloud app deploy ../app/app.yaml -q
echo "Current go path = "$GOPATH