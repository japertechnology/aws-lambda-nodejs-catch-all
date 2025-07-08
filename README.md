# AWS Lambda Nodejs Catch All

This project provides a universal AWS Lambda entry point written in Node.js.
It inspects the incoming event and automatically dispatches to the correct
handler based on the source of the invocation.

## Installation

Clone the repository and install the development dependencies used for
testing and linting:

```bash
npm install
```

This project requires **Node.js 18 or later**, as specified in
`package.json`.

## Deployment

Zip the contents of the repository and upload them using the AWS CLI:

```bash
zip -r function.zip index.mjs handlers/
aws lambda create-function \
  --function-name universal-handler \
  --runtime nodejs18.x \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --role <role-arn>
```

To update an existing function:

```bash
zip -r function.zip index.mjs handlers/
aws lambda update-function-code \
  --function-name universal-handler \
  --zip-file fileb://function.zip
```

## Supported Event Sources

The handler recognizes and dispatches events from:

- Alexa Skills Kit
- Amazon Lex bots
- AWS AppSync (GraphQL resolvers)
- IoT Rules
- Kinesis Firehose data transformation
- AWS Config rules
- Step Functions tasks
- WebSocket APIs
- API Gateway authorizers (v1 and v2)
- API Gateway HTTP APIs (v1 and v2)
- Application Load Balancers
- Lambda@Edge
- CloudWatch Logs subscriptions
- CloudFormation custom resources
- Cognito triggers
- SQS, SNS, S3, DynamoDB Streams, Kinesis Streams, SES
- EventBridge / CloudWatch Events
- Scheduled events
- Fallback for other events

### Example Event Payloads

HTTP API v1 request:

```json
{
  "httpMethod": "GET",
  "path": "/hello"
}
```

S3 event:

```json
{
  "Records": [
    {
      "eventSource": "aws:s3",
      "s3": {
        "bucket": { "name": "my-bucket" },
        "object": { "key": "file.txt" }
      }
    }
  ]
}
```

EventBridge event:

```json
{
  "source": "my.app",
  "detail-type": "example",
  "detail": {"key": "value"}
}
```

## Testing

Run the unit tests with:

```bash
npm test
```

## Contributing

Issues and pull requests are welcome. If adding new handlers or tests,
please follow the existing code style and include relevant documentation.

## Usage

After deploying, invoke the Lambda with your event payload. For example:

```bash
aws lambda invoke \
  --function-name universal-handler \
  --payload '{"httpMethod":"GET","path":"/"}' output.json
```

