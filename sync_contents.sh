#!/bin/sh -ue
. ./config.sh

aws s3 sync contents "s3://$S3BucketName/" \
    --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
