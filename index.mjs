/**
 * Universal AWS Lambda handler supporting multiple invocation sources,
 * including Alexa, Lex, AppSync, IoT Rules, Kinesis Firehose,
 * AWS Config Rules, Step Functions, SES, WebSocket, API Gateway
 * Custom Authorizers, CloudWatch Logs, CloudFormation Custom Resources,
 * and Cognito Triggers.
 */
exports.handler = async (event, context) => {
  try {
    // Alexa Skills Kit (Custom Skill)
    if (event.request && event.session && event.context?.System) {
      return await handleAlexa(event, context);
    }
    // Lex Bot
    if (event.bot && event.userId && event.inputTranscript) {
      return await handleLex(event, context);
    }
    // AppSync (GraphQL Resolver)
    if (event.arguments && event.identity && event.info) {
      return await handleAppSync(event, context);
    }
    // IoT Rule
    if (event.clientId && event.topic && event.payload) {
      return await handleIoTRule(event, context);
    }
    // Kinesis Firehose Data Transformation
    if (event.records && Array.isArray(event.records) && event.records[0]?.recordId) {
      return await handleFirehose(event, context);
    }
    // AWS Config Rule Evaluation
    if (event.invokingEvent && event.ruleParameters && event.resultToken) {
      return await handleConfigRule(event, context);
    }
    // Step Functions (Sync Task)
    if (event.execution && event.stateMachineArn) {
      return await handleStepFunctions(event, context);
    }
    // API Gateway WebSocket (HTTP API v2)
    if (event.version === '2.0' && event.requestContext?.routeKey && event.requestContext?.connectionId) {
      return await handleWebSocket(event, context);
    }
    // API Gateway Custom Authorizer v1
    if (event.type === 'TOKEN' && event.methodArn) {
      return await handleAuthorizerV1(event, context);
    }
    // API Gateway Custom Authorizer v2
    if (event.version === '2.0' && event.type === 'REQUEST') {
      return await handleAuthorizerV2(event, context);
    }
    // HTTP API Gateway v2 (HTTP API)
    if (event.version === '2.0' && event.requestContext?.http?.method) {
      return await handleHttpV2(event, context);
    }
    // HTTP API Gateway v1 (REST API)
    if (event.httpMethod) {
      return await handleHttpV1(event, context);
    }
    // Application Load Balancer
    if (event.requestContext?.elb) {
      return await handleAlb(event, context);
    }
    // Lambda@Edge
    if (event.Records && event.Records[0]?.cf) {
      return await handleEdge(event, context);
    }
    // CloudWatch Logs subscription
    if (event.awslogs?.data) {
      return await handleCloudWatchLogs(event, context);
    }
    // CloudFormation Custom Resource
    if (event.RequestType && event.ResponseURL) {
      return await handleCustomResource(event, context);
    }
    // Cognito User Pool Trigger
    if (event.triggerSource && event.userPoolId) {
      return await handleCognito(event, context);
    }
    // Records-based event sources (SQS, SNS, S3, DynamoDB, Kinesis, SES)
    if (event.Records && Array.isArray(event.Records) && event.Records.length > 0) {
      const source = event.Records[0].eventSource || event.Records[0].EventSource;
      switch (source) {
        case 'aws:sqs':      return await handleSqs(event, context);
        case 'aws:sns':      return await handleSns(event, context);
        case 'aws:s3':       return await handleS3(event, context);
        case 'aws:dynamodb': return await handleDynamoDB(event, context);
        case 'aws:kinesis':  return await handleKinesis(event, context);
        case 'aws:ses':      return await handleSes(event, context);
        default:             return await handleDefault(event, context);
      }
    }
    // EventBridge / CloudWatch Events
    if (event.source && event['detail-type']) {
      return await handleEventBridge(event, context);
    }
    // Scheduled CloudWatch event
    if (event.source === 'aws.events') {
      return await handleScheduled(event, context);
    }
    // Fallback handler
    return await handleDefault(event, context);
  } catch (err) {
    console.error('Error processing event', err);
    // For HTTP requests, return an error response
    if (event.httpMethod || (event.version === '2.0' && event.requestContext?.http?.method)) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
    throw err;
  }
};

// Handlers with available fields outlined in comments

async function handleAlexa(event, context) {
  /* Alexa fields:
   - event.session.sessionId
   - event.request.type, requestId, timestamp
   - event.request.intent.name, event.request.intent.slots
   - event.context.System.device.deviceId, apiEndpoint
  */
  console.log('Alexa request type:', event.request.type);
  return { version: '1.0', response: { outputSpeech: { type: 'PlainText', text: 'Hello from Alexa!' } } };
}

async function handleLex(event, context) {
  /* Lex fields:
   - event.bot.name, alias, version
   - event.userId
   - event.inputTranscript
   - event.currentIntent.name, slots, confirmationStatus
   - event.invocationSource
  */
  console.log('Lex intent:', event.currentIntent.name);
  return { sessionAttributes: {}, dialogAction: { type: 'Close', fulfillmentState: 'Fulfilled', message: { contentType: 'PlainText', content: 'Hello from Lex!' } } };
}

async function handleAppSync(event, context) {
  /* AppSync fields:
   - event.arguments
   - event.identity
   - event.info.fieldName, parentTypeName, selectionSetList
  */
  console.log('AppSync field:', event.info.fieldName);
  return null;
}

async function handleIoTRule(event, context) {
  /* IoT Rule fields:
   - event.clientId, principalId
   - event.topic
   - event.payload
   - event.timestamp
  */
  console.log('IoT topic:', event.topic);
  return { processed: true };
}

async function handleFirehose(event, context) {
  /* Firehose fields:
   - event.records[].recordId, approximateArrivalTimestamp
   - event.records[].data (Base64)
  */
  const output = event.records.map(r => ({ recordId: r.recordId, result: 'Ok', data: r.data }));
  return { records: output };
}

async function handleConfigRule(event, context) {
  /* Config Rule fields:
   - event.invokingEvent
   - event.ruleParameters
   - event.resultToken
  */
  console.log('Config rule invoke:', event.invokingEvent);
  return { complianceType: 'COMPLIANT', annotation: 'Default OK' };
}

async function handleStepFunctions(event, context) {
  /* Step Functions fields:
   - event.execution.eventId, name, input
   - event.stateMachineArn
  */
  console.log('StepFunctions execution:', event.execution.name);
  return { status: 'SUCCEEDED', output: event.execution.input };
}

async function handleWebSocket(event, context) {
  /* WebSocket fields:
   - event.requestContext.routeKey, connectionId, domainName, stage
   - event.body
  */
  console.log('WebSocket route:', event.requestContext.routeKey);
  return { statusCode: 200, body: 'WebSocket message received' };
}

async function handleAuthorizerV1(event, context) {
  /* Authorizer v1 fields:
   - event.type === 'TOKEN'
   - event.authorizationToken
   - event.methodArn
  */
  return { principalId: 'user', policyDocument: { Version: '2012-10-17', Statement: [{ Action: 'execute-api:Invoke', Effect: 'Allow', Resource: event.methodArn }] } };
}

async function handleAuthorizerV2(event, context) {
  /* Authorizer v2 fields:
   - event.type === 'REQUEST'
   - event.routeArn, event.identitySource
   - event.requestContext.http.method
  */
  return { isAuthorized: true, context: {} };
}

async function handleHttpV1(event, context) {
  /* API Gateway v1 fields:
   - event.httpMethod, event.path, event.headers
   - event.queryStringParameters, pathParameters, stageVariables
   - event.requestContext, event.body, event.isBase64Encoded
  */
  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello from API Gateway v1', event }) };
}

async function handleHttpV2(event, context) {
  /* API Gateway v2 fields:
   - event.version === '2.0'
   - event.requestContext.http.method, rawPath, rawQueryString
   - event.headers, event.queryStringParameters, event.body
  */
  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello from API Gateway v2', event }) };
}

async function handleAlb(event, context) {
  /* ALB fields:
   - event.requestContext.elb.targetGroupArn
   - event.httpMethod, event.path, queryStringParameters
   - event.headers, event.body, event.isBase64Encoded
  */
  return { statusCode: 200, statusDescription: '200 OK', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello from ALB', event }) };
}

async function handleEdge(event, context) {
  /* Lambda@Edge fields:
   - event.Records[0].cf.config.eventType, distributionId
   - event.Records[0].cf.request.uri, method, headers
  */
  const request = event.Records[0].cf.request;
  return request;
}

async function handleCloudWatchLogs(event, context) {
  /* CloudWatch Logs fields:
   - event.awslogs.data (Base64 gzipped payload)
  */
  console.log('Logs subscription payload received');
  return {};
}

async function handleCustomResource(event, context) {
  /* CloudFormation Custom Resource fields:
   - event.RequestType, ServiceToken, ResponseURL
   - event.ResourceProperties
  */
  console.log('Custom Resource request:', event.RequestType);
  return {};
}

async function handleCognito(event, context) {
  /* Cognito Trigger fields:
   - event.triggerSource, event.userPoolId, event.userName
   - event.request, event.response
  */
  console.log('Cognito trigger:', event.triggerSource);
  return event;
}

async function handleSqs(event, context) {
  /* SQS fields:
   - event.Records[].messageId, receiptHandle, body
   - event.Records[].attributes, messageAttributes
  */
  event.Records.forEach(r => console.log('SQS:', r.body));
  return { processed: event.Records.length };
}

async function handleSns(event, context) {
  /* SNS fields:
   - event.Records[].Sns.MessageId, TopicArn, Subject, Message
   - event.Records[].Sns.Timestamp, MessageAttributes
  */
  event.Records.forEach(r => console.log('SNS:', r.Sns.Message));
  return { processed: event.Records.length };
}

async function handleS3(event, context) {
  /* S3 fields:
   - event.Records[].s3.bucket.name, arn
   - event.Records[].s3.object.key, size, eTag
  */
  event.Records.forEach(r => console.log('S3:', r.s3.bucket.name, r.s3.object.key));
  return { processed: event.Records.length };
}

async function handleDynamoDB(event, context) {
  /* DynamoDB Streams fields:
   - event.Records[].eventID, eventName, awsRegion
   - event.Records[].dynamodb.Keys, NewImage, OldImage
  */
  event.Records.forEach(r => console.log('DynamoDB:', r.dynamodb));
  return { processed: event.Records.length };
}

async function handleKinesis(event, context) {
  /* Kinesis fields:
   - event.Records[].eventID, kinesis.partitionKey
   - event.Records[].kinesis.data, approximateArrivalTimestamp
  */
  event.Records.forEach(r => {
    const data = Buffer.from(r.kinesis.data, 'base64').toString('utf8');
    console.log('Kinesis:', data);
  });
  return { processed: event.Records.length };
}

async function handleSes(event, context) {
  /* SES fields:
   - event.Records[].ses.mail.messageId, source, destination
   - event.Records[].ses.mail.commonHeaders.subject, from, to, date
   - event.Records[].ses.receipt.spfVerdict, dkimVerdict, spamVerdict, virusVerdict
   - event.Records[].ses.receipt.action.type, functionArn
  */
  event.Records.forEach(r => {
    console.log('SES from:', r.ses.mail.source);
    console.log('SES subject:', r.ses.mail.commonHeaders.subject);
  });
  return { processed: event.Records.length };
}

async function handleEventBridge(event, context) {
  /* EventBridge fields:
   - event.version, id, 'detail-type', source
   - event.account, region, time, resources, detail
  */
  console.log('EventBridge event:', event['detail-type']);
  return { processed: true };
}

async function handleScheduled(event, context) {
  /* Scheduled CloudWatch fields:
   - event.version, id, 'detail-type' === 'Scheduled Event'
   - event.source === 'aws.events'
   - event.account, region, time, resources
  */
  console.log('Scheduled event at:', event.time);
  return { processed: true };
}

async function handleDefault(event, context) {
  /* Fallback fields:
   - context.awsRequestId, logGroupName, logStreamName
   - context.functionName, memoryLimitInMB
  */
  console.warn('Unhandled event type');
  return { fallback: true };
}
