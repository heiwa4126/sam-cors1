#!/bin/sh

## required tomlq in yq. Try `apt install jq` and `pip3 install yq`
REGION=`tomlq -r .default.deploy.parameters.region samconfig.toml`
STACK_NAME=`tomlq -r .default.deploy.parameters.stack_name samconfig.toml`

aws cloudformation delete-stack \
    --region "$REGION" \
    --stack-name "$STACK_NAME"
