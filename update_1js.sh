#!/bin/sh -ue

cd $(dirname "$0")

## required tomlq in yq. Try `apt install jq` and `pip3 install yq`

REGION=`tomlq -r .default.deploy.parameters.region samconfig.toml`
STACK_NAME=`tomlq -r .default.deploy.parameters.stack_name samconfig.toml`
URL=$( aws cloudformation describe-stacks \
           --region "$REGION" \
           --stack-name "$STACK_NAME" | \
         jq -r '.Stacks[0].Outputs[]|select(.OutputKey=="HelloApiURL").OutputValue' )

sed "s|{{ lambda_url }}|$URL|" < 1.tmplate.js > contents/js/1.js
