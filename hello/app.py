"""AWS Lambda sample for CORS."""
import json
from datetime import datetime, timezone


def lambda_handler(event, context):
    """Lambda handler."""
    return {
        "statusCode": 200,
        # optionsだけでなく、こちらにも要る
        "headers": {
            "Access-Control-Allow-Origin": "*",
            # "Access-Control-Allow-Origin": "https://www.example.net",
            # 複数指定はできない↓
            # "Access-Control-Allow-Origin": "https://www.example.net http://www.example.com",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            # ↑optionsとちがっていてもOK。optionsより強めにすればいいらしい。
            # "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            # ↑optionsとちがっていてもOK。optionsより強めにすればいいらしい。
            # "Access-Control-Allow-Credentials": "true",
            # Access-Control-Allow-Originが*でない場合に設定するべき
        },
        "body": json.dumps({"message": "OK", "time": str(datetime.now(timezone.utc))}),
    }
