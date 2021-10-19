#!/bin/sh

## required tomlq in yq. Try `apt install jq` and `pip3 install yq`
REGION=`tomlq -r .default.deploy.parameters.region samconfig.toml`
STACK_NAME=`tomlq -r .default.deploy.parameters.stack_name samconfig.toml`
eval $(tomlq -r .default.deploy.parameters.parameter_overrides samconfig.toml)

aws s3 rm "s3://$BucketName/" --recursive --region "$REGION"

aws cloudformation delete-stack \
    --region "$REGION" \
    --stack-name "$STACK_NAME"
